import * as z from "zod";
import { CompleteInventory, relatedInventorySchema } from "./index";

export const attributesSchema = z.object({
  id: z.string(),
  key: z.string().nullish(),
  value: z.string().nullish(),
  inventoryId: z.string().nullish(),
});

export interface CompleteAttributes extends z.infer<typeof attributesSchema> {
  Inventory?: CompleteInventory | null;
}

/**
 * relatedAttributesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAttributesSchema: z.ZodSchema<CompleteAttributes> = z.lazy(
  () =>
    attributesSchema.extend({
      Inventory: relatedInventorySchema.nullish(),
    }),
);
