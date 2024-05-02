import { getUserAuth } from "@repo/auth";

export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await getUserAuth();

  return {
    session: session,
    ...opts,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
