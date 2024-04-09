<<<<<<< Updated upstream
import * as z from "zod"
import { CompleteInventory, relatedInventorySchema, CompleteUser, relatedUserSchema } from "./index"
=======
import * as z from "zod";
import {
  CompleteInventory,
  relatedInventorySchema,
<<<<<<< Updated upstream
  CompleteAdNft,
  relatedAdNftSchema,
=======
>>>>>>> Stashed changes
  CompleteUser,
  relatedUserSchema,
} from "./index";
>>>>>>> Stashed changes

export const projectSchema = z.object({
  id: z.string(),
  inventoryId: z.string(),
  underdogProjectId: z.number().int(),
  collectionMintAddress: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProject extends z.infer<typeof projectSchema> {
<<<<<<< Updated upstream
  inventory: CompleteInventory
  user: CompleteUser
=======
  inventory: CompleteInventory;
<<<<<<< Updated upstream
  adNft: CompleteAdNft[];
=======
>>>>>>> Stashed changes
  user: CompleteUser;
>>>>>>> Stashed changes
}

/**
 * relatedProjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
<<<<<<< Updated upstream
export const relatedProjectSchema: z.ZodSchema<CompleteProject> = z.lazy(() => projectSchema.extend({
  inventory: relatedInventorySchema,
  user: relatedUserSchema,
}))
=======
export const relatedProjectSchema: z.ZodSchema<CompleteProject> = z.lazy(() =>
  projectSchema.extend({
    inventory: relatedInventorySchema,
<<<<<<< Updated upstream
    adNft: relatedAdNftSchema.array(),
=======
>>>>>>> Stashed changes
    user: relatedUserSchema,
  }),
);
>>>>>>> Stashed changes
