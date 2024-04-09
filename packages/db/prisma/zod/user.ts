import * as z from "zod";
import {
  CompleteProject,
  relatedProjectSchema,
  CompleteAdSlot,
  relatedAdSlotSchema,
  CompleteInventory,
  relatedInventorySchema,
} from "./index";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  walletAddress: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof userSchema> {
  nftProject: CompleteProject[];
  adSlots: CompleteAdSlot[];
  inventory: CompleteInventory[];
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
  userSchema.extend({
    nftProject: relatedProjectSchema.array(),
    adSlots: relatedAdSlotSchema.array(),
    inventory: relatedInventorySchema.array(),
  }),
);
