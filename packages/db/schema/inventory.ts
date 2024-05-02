import { z } from "zod";

// Schema for inventory - used to validate API requests
const baseSchema = z.object({
  inventoryName: z.string(),
  inventoryWebsiteUri: z.string(),
  inventoryImageUri: z.string(),
  inventoryDescription: z.string(),
  status: z.enum(["active", "inactive"]),
});
export const insertInventoryParams = baseSchema.omit({
  status: true,
});
export const insertInventoryForm = insertInventoryParams.omit({
  inventoryImageUri: true,
});

export const updateInventorySchema = baseSchema;
export const updateInventoryParams = updateInventorySchema;

// this type infers the return from getInventory() - meaning it will include any joins
// export type CompleteInventory = Awaited<ReturnType<typeof getInventories>>["inventory"][number];
