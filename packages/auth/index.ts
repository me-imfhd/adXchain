import { db } from "@repo/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
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

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      walletAddress?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      session.user.walletAddress = user.walletAddress;
      return session;
    },
  },
  providers: [],
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};

export { SessionProvider } from "next-auth/react";
