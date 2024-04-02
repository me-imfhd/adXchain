import * as z from "zod"
import { CompleteInventory, relatedInventorySchema } from "./index"

export const adSlotSchema = z.object({
  id: z.string(),
  slotName: z.string().nullish(),
  slotDescription: z.string().nullish(),
  slotLength: z.string().nullish(),
  slotWidth: z.string().nullish(),
  slotWebsiteUri: z.string().nullish(),
  slotImageUri: z.string().nullish(),
  lent: z.boolean().nullish(),
  mintAddress: z.string().nullish(),
  ownerAddress: z.string().nullish(),
  ownerEmail: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  inventoryId: z.string(),
})

export interface CompleteAdSlot extends z.infer<typeof adSlotSchema> {
  inventory: CompleteInventory
}

/**
 * relatedAdSlotSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdSlotSchema: z.ZodSchema<CompleteAdSlot> = z.lazy(() => adSlotSchema.extend({
  inventory: relatedInventorySchema,
}))
