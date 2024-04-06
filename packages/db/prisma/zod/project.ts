import * as z from "zod";
import {
  CompleteInventory,
  relatedInventorySchema,
  CompleteAdNft,
  relatedAdNftSchema,
  CompleteUser,
  relatedUserSchema,
} from "./index";

export const projectSchema = z.object({
  id: z.string(),
  inventoryId: z.string(),
  underdogProjectId: z.number().int(),
  collectionMintAddress: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteProject extends z.infer<typeof projectSchema> {
  inventory: CompleteInventory;
  adNft?: CompleteAdNft | null;
  user: CompleteUser;
}

/**
 * relatedProjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProjectSchema: z.ZodSchema<CompleteProject> = z.lazy(() =>
  projectSchema.extend({
    inventory: relatedInventorySchema,
    adNft: relatedAdNftSchema.nullish(),
    user: relatedUserSchema,
  }),
);
