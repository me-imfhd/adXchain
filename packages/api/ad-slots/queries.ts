import { BuySlot, InventoryId, db } from "@repo/db";
import { AdSlotId } from "@repo/db";

export const getAdSlots = async (id: InventoryId) => {
  const a = await db.inventory.findUnique({
    where: { id },
    include: { adSlots: true },
  });
  return a?.adSlots;
};

export const getAdSlotById = async (id: AdSlotId) => {
  const a = await db.adSlot.findFirst({
    where: { id },
    include: { inventory: true },
  });
  return a;
};

export const getSlotCountInInventory = async (id: InventoryId) => {
  const total = await db.adSlot.count({ where: { inventoryId: id } });
  const lent = await db.adSlot.count({
    where: { inventoryId: id, lent: true },
  });

  return { total, lent };
};
export type GetAdSlotById = Awaited<ReturnType<typeof getAdSlotById>>;

export const buySlot = async (data: BuySlot) => {
  const a = await db.adSlot.update({
    where: { id: data.id },
    data: { ...data },
  });
};
