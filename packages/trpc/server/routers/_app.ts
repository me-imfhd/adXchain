import { createTRPCRouter } from "../trpc";
import { underdogRouter } from "./underdog";

export const appRouter = createTRPCRouter({
  underdog: underdogRouter,
});

export type AppRouter = typeof appRouter;
