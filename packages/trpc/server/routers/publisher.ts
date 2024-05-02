import { getAd } from "@repo/api";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getAdSchema, getAdsSchema } from "@repo/db";

export const publisherRouter = createTRPCRouter({
  getAd: publicProcedure
    .input(getAdSchema)
    .query(async ({ input: { adSlotId, underdogApiEndpoint } }) => {
      return getAd(adSlotId, underdogApiEndpoint);
    }),
});
