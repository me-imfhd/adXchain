import { z } from "zod";
import { inventorySchema } from "../prisma/zod";

// Schema for inventory - used to validate API requests
const baseSchema = inventorySchema;

export const insertInventorySchema = baseSchema.omit({ id: true });
export const insertInventoryParams = baseSchema
  .extend({
    adSlotId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateInventorySchema = baseSchema;
export const updateInventoryParams = updateInventorySchema
  .extend({
    adSlotId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const inventoryIdSchema = baseSchema.pick({ id: true });

// Types for inventory - used to type API request params and within Components
export type Inventory = z.infer<typeof inventorySchema>;
export type NewInventory = z.infer<typeof insertInventorySchema>;
export type NewInventoryParams = z.infer<typeof insertInventoryParams>;
export type UpdateInventoryParams = z.infer<typeof updateInventoryParams>;
export type InventoryId = z.infer<typeof inventoryIdSchema>["id"];

// this type infers the return from getInventory() - meaning it will include any joins
// export type CompleteInventory = Awaited<ReturnType<typeof getInventories>>["inventory"][number];
