import { z } from "zod";
import { inventorySchema } from "../prisma/zod";

// Schema for inventory - used to validate API requests
const baseSchema = inventorySchema;

export const insertInventoryParams = baseSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateInventorySchema = baseSchema;
export const updateInventoryParams = updateInventorySchema.omit({
  userId: true,
  createdAt: true,
});
export const inventoryIdSchema = baseSchema.pick({ id: true });
export const inventoryNameSchema = baseSchema.pick({ inventoryName: true });
export const inventoryImageSchema = baseSchema.pick({ inventoryImageUri: true });


// Types for inventory - used to type API request params and within Components
export type Inventory = z.infer<typeof inventorySchema>;
export type NewInventoryParams = z.infer<typeof insertInventoryParams>;
export type UpdateInventoryParams = z.infer<typeof updateInventoryParams>;
export type InventoryId = z.infer<typeof inventoryIdSchema>["id"];
export type InventoryName = z.infer<
  typeof inventoryNameSchema
>["inventoryName"];

// this type infers the return from getInventory() - meaning it will include any joins
// export type CompleteInventory = Awaited<ReturnType<typeof getInventories>>["inventory"][number];
