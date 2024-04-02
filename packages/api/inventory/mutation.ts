import { getUserAuth } from "@repo/auth";
import {
  NewInventoryParams,
  insertInventorySchema,
  db,
  UpdateInventoryParams,
  InventoryId,
  inventoryIdSchema,
  updateInventorySchema,
} from "@repo/db";

export const createInventory = async (inventory: NewInventoryParams) => {
  const session = await getUserAuth();
  const newInventory = insertInventorySchema.parse({
    ...inventory,
    userId: session?.user.id!,
  });
  try {
    const i = await db.inventory.create({ data: newInventory });
    return { inventory: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInventory = async (
  id: InventoryId,
  inventory: UpdateInventoryParams
) => {
  const session  = await getUserAuth();
  const { id: inventoryId } = inventoryIdSchema.parse({ id });
  const newInventory = updateInventorySchema.parse({
    ...inventory,
    userId: session?.user.id!,
  });
  try {
    const i = await db.inventory.update({
      where: { id: inventoryId, userId: session?.user.id! },
      data: newInventory,
    });
    return { inventory: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInventory = async (id: InventoryId) => {
  const session  = await getUserAuth();
  const { id: inventoryId } = inventoryIdSchema.parse({ id });
  try {
    const i = await db.inventory.delete({
      where: { id: inventoryId, userId: session?.user.id! },
    });
    return { inventory: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
