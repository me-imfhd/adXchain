import { createNftAndUpdateLent } from "@repo/api";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createAdNftSchema } from "@repo/db";

export const adNftRouter = createTRPCRouter({
  createNftAndUpdateLent: protectedProcedure
    .input(createAdNftSchema)
    .mutation(async ({ input }) => {
      return createNftAndUpdateLent(input);
    }),
});
