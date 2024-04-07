import { getAd, getAds } from "@repo/api";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getAdSchema, getAdsSchema } from "@repo/db";

export const publisherRouter = createTRPCRouter({
  getAds: publicProcedure
    .input(getAdsSchema)
    .query(async ({ input: { inventoryId, underdogApiEndpoint } }) => {
      return getAds(inventoryId, underdogApiEndpoint);
    }),

  getAd: publicProcedure
    .input(getAdSchema)
    .query(async ({ input: { adSlotId, underdogApiEndpoint } }) => {
      return getAd(adSlotId, underdogApiEndpoint);
    }),
});
