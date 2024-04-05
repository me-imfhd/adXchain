import * as z from "zod"
import { CompleteAttributes, relatedAttributesSchema, CompleteAdSlot, relatedAdSlotSchema, CompleteUser, relatedUserSchema, CompleteProject, relatedProjectSchema } from "./index"

export const inventorySchema = z.object({
  id: z.string(),
  inventoryName: z.string(),
  inventoryWebsiteUri: z.string(),
  inventoryImageUri: z.string(),
  inventoryDescription: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export interface CompleteInventory extends z.infer<typeof inventorySchema> {
  inventoryAttributes: CompleteAttributes[]
  adSlots: CompleteAdSlot[]
  user: CompleteUser
  projects: CompleteProject[]
}

/**
 * relatedInventorySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedInventorySchema: z.ZodSchema<CompleteInventory> = z.lazy(() => inventorySchema.extend({
  inventoryAttributes: relatedAttributesSchema.array(),
  adSlots: relatedAdSlotSchema.array(),
  user: relatedUserSchema,
  projects: relatedProjectSchema.array(),
}))
