import {
  AdSlotId,
  BuySlot,
  NewAdSlotParams,
  UpdateAdSlotParams,
  adSlotIdSchema,
  insertAdSlotSchema,
} from "@repo/db";
import { db } from "@repo/db";

export const createAdSlot = async (adSlot: NewAdSlotParams) => {
  const newAdSlot = insertAdSlotSchema.parse(adSlot);
  try {
    const a = await db.adSlot.create({ data: newAdSlot });
    return { adSlot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdSlot = async (
  id: AdSlotId,
  adSlot: UpdateAdSlotParams
) => {
  try {
    const a = await db.adSlot.update({
      where: { id },
      data: adSlot,
    });
    return { adSlot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdSlot = async (id: AdSlotId) => {
  const { id: adSlotId } = adSlotIdSchema.parse({ id });
  try {
    const a = await db.adSlot.delete({ where: { id: adSlotId } });
    return { adSlot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const buyMultipleSlots = async (data: BuySlot[]) => {
  const promises = data.map((adSlot) => {
    return db.adSlot.update({ where: { id: adSlot.id }, data: { ...adSlot } });
  });
  const updatedSlots = await db.$transaction(promises);
};
