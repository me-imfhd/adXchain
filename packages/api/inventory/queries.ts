import { getUserAuth } from "@repo/auth";
import { InventoryId, db } from "@repo/db";

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
      adSlots: {
        where: { status: "active" },
        include: { owner: true },
      },
    },
  });
  return i;
};

export const getInventoryById = async (id: InventoryId) => {
  const i = await db.inventory.findUnique({
    where: { id },
    include: {
      adSlots: { include: { owner: true } },
      user: true,
    },
  });
  return i;
};
export const getActiveInventoryById = async (id: InventoryId) => {
  const i = await db.inventory.findUnique({
    where: { id },
    include: {
      user: true,
      adSlots: {
        where: { status: "active" },
        include: { owner: true },
      },
    },
  });
  return i;
};
export type GetActiveInventoryById = Awaited<
  ReturnType<typeof getActiveInventoryById>
>;
export type GetInventoryById = Awaited<ReturnType<typeof getInventoryById>>;
