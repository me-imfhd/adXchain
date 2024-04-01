import * as z from "zod";
import { CompleteInventory, relatedInventorySchema } from "./index";

export const adSlotSchema = z.object({
  id: z.string(),
  inventoryId: z.string(),
  mintAddress: z.string().nullish(),
  ownerAddress: z.string().nullish(),
  sold: z.boolean().nullish(),
  ownerEmail: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
