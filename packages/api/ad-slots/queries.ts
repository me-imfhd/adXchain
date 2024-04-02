import { AdSlotName, InventoryId, InventoryName, db } from "@repo/db";
import { AdSlotId, adSlotIdSchema, inventoryIdSchema } from "@repo/db";

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
  });
  return a;
};
