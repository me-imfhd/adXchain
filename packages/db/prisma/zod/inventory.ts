import * as z from "zod";
import {
  CompleteAttributes,
  relatedAttributesSchema,
  CompleteUser,
  relatedUserSchema,
  CompleteAdSlot,
  relatedAdSlotSchema,
} from "./index";

export const inventorySchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  websiteUri: z.string().nullish(),
  imageUri: z.string().nullish(),
  description: z.string().nullish(),
  platform: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteInventory extends z.infer<typeof inventorySchema> {
  attributes: CompleteAttributes[];
  user: CompleteUser;
  adSlots: CompleteAdSlot[];
}

/**
 * relatedInventorySchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedInventorySchema: z.ZodSchema<CompleteInventory> = z.lazy(
  () =>
    inventorySchema.extend({
      attributes: relatedAttributesSchema.array(),
      user: relatedUserSchema,
      adSlots: relatedAdSlotSchema.array(),
    }),
);
