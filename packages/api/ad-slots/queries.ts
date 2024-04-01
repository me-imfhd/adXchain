import { db } from "@repo/db";
import { AdSlotId, adSlotIdSchema } from "@repo/db";

export const getAdSlots = async () => {
  const a = await db.adSlot.findMany({});
  return { adSlots: a };
};

export const getAdSlotById = async (id: AdSlotId) => {
  const { id: adSlotId } = adSlotIdSchema.parse({ id });
  const a = await db.adSlot.findFirst({
    where: { id: adSlotId },
  });
  return { adSlot: a };
};
