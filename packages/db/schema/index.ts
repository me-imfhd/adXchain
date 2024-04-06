import { z } from "zod";

export * from "./imageConversion";
export * from "./auth";
export * from "./adSlots";
export * from "./inventory";
export * from "./user";
export * from "./project";
export * from "./adnft";
export const getAdsSchema = z.object({
  inventoryId: z.string(),
  underdogApiEndpoint: z.string(),
});
