import { getAds } from "@repo/api";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { getAdsSchema } from "@repo/db";

export const publisherRouter = createTRPCRouter({
  getAds: publicProcedure
    .input(getAdsSchema)
    .query(async ({ input: { inventoryId, underdogApiEndpoint } }) => {
      return getAds(inventoryId, underdogApiEndpoint);
    }),
});
