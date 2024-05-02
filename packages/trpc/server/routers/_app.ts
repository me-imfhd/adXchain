import { createTRPCRouter } from "../trpc";
import { publisherRouter } from "./publisher";
import { underdogRouter } from "./underdog";

export const appRouter = createTRPCRouter({
  publisher: publisherRouter,
  underdog: underdogRouter,
});

export type AppRouter = typeof appRouter;
