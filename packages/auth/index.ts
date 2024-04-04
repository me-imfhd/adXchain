import { db } from "@repo/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SigninMessage } from "./signMessage";
import { getCsrfToken } from "next-auth/react";
import NextAuth from "next-auth/next";
import { redirect } from "next/navigation";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      walletAddress: string | null | undefined;
    };
  }
  interface User {
    walletAddress: string | null | undefined;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    walletAddress: string | null | undefined;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ token, session }) {
      return {
        ...session,
        user: {
          id: token.id,
          walletAddress: token.walletAddress,
          email: token.email,
          name: token.name,
        },
      };
    },
  },

  providers: [
    CredentialsProvider({
      name: "Solana",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
        email: {
          label: "Email",
          type: "text",
        },
        name: {
          label: "Business Name",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        try {
          const signinMessage = new SigninMessage(
            JSON.parse(credentials?.message || "{}"),
          );
          const walletAddress = signinMessage.publicKey as string;
          const name = credentials?.name;
          const email = credentials?.email;
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!);
          if (signinMessage.domain !== nextAuthUrl.host) {
            return null;
          }

          const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

          if (signinMessage.nonce !== csrfToken) {
            return null;
          }

          const validationResult = await signinMessage.validate(
            credentials?.signature || "",
          );

          if (!validationResult)
            throw new Error("Could not validate the signed message");

          const alreadyUser = await db.user.findUnique({
            where: { walletAddress },
          });
          if (alreadyUser) {
            return alreadyUser;
          }
          const user = await db.user.create({
            data: { walletAddress, name, email },
          });

          return user;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const checkAuth = async () => {
  const session = await getUserAuth();
  if (!session) redirect("/signin");
};

export {
  SessionProvider,
  getCsrfToken,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
export { type Session } from "next-auth";
export * from "./signMessage";
