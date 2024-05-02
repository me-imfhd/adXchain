import { z } from "zod";

export * from "./adSlots";
export * from "./inventory";
export const getAdsSchema = z.object({
  inventoryId: z.string(),
  underdogApiEndpoint: z.string(),
});
export const getAdSchema = z.object({
  adSlotId: z.string(),
  underdogApiEndpoint: z.string(),
});
