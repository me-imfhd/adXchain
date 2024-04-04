import { getUserAuth } from "@repo/auth";
import {
  NewInventoryParams,
  db,
  UpdateInventoryParams,
  InventoryId,
} from "@repo/db";

export const createInventory = async (inventory: NewInventoryParams) => {
  const session = await getUserAuth();
  const newInventory = {
    ...inventory,
    userId: session?.user.id!,
  };
  try {
    const i = await db.inventory.create({ data: newInventory });
    return i;
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
export const updateInventory = async (
  id: InventoryId,
  inventory: UpdateInventoryParams,
) => {
  const session = await getUserAuth();
  const newInventory = {
    ...inventory,
    userId: session?.user.id!,
  };
  try {
    const i = await db.inventory.update({
      where: { id, userId: session?.user.id! },
      data: newInventory,
    });
    return i;
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInventory = async (id: InventoryId) => {
  const session = await getUserAuth();
  try {
    const i = await db.inventory.delete({
      where: { id: id, userId: session?.user.id! },
    });
    return i;
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
