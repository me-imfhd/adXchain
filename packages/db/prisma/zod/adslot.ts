import * as z from "zod";
import { CompleteInventory, relatedInventorySchema } from "./index";

export const adSlotSchema = z.object({
  id: z.string(),
  slotName: z.string(),
  slotDescription: z.string(),
  slotLength: z.number(),
  slotWidth: z.number(),
  slotWebsiteUri: z.string(),
  slotImageUri: z.string(),
  slotType: z.string(),
  slotPrice: z.bigint(),
  status: z.string(),
  slotPlatform: z.string(),
  lent: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  inventoryId: z.string(),
});

export interface CompleteAdSlot extends z.infer<typeof adSlotSchema> {
  inventory: CompleteInventory;
}

/**
 * relatedAdSlotSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdSlotSchema: z.ZodSchema<CompleteAdSlot> = z.lazy(() =>
  adSlotSchema.extend({
    inventory: relatedInventorySchema,
  }),
);
