import { getUserAuth } from "@repo/auth";
import { InventoryId, db, inventoryIdSchema } from "@repo/db";

export const getInventories = async () => {
  const session = await getUserAuth();
  const i = await db.inventory.findMany({
    where: { userId: session?.user.id! },
    include: { adSlots: true },
  });
  return i;
};

export const getAllInventories = async () => {
  const i = await db.inventory.findMany({
    include: {
      user: { select: { walletAddress: true } },
      adSlots: { select: { lent: true } },
    },
  });
  return i;
};

export const getInventoryById = async (id: InventoryId) => {
  const session = await getUserAuth();
  const { id: inventoryId } = inventoryIdSchema.parse({ id });
  const i = await db.inventory.findFirst({
    where: { id: inventoryId, userId: session?.user.id! },
    include: { adSlots: true },
  });
  return i;
};

export type GetInventoryById = Awaited<ReturnType<typeof getInventoryById>>;
