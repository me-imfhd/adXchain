import { authOptions } from "@repo/auth";
import NextAuth from "@repo/auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
