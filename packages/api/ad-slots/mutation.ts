import {
  AdSlotId,
  NewAdSlotParams,
  UpdateAdSlotParams,
  adSlotIdSchema,
  insertAdSlotSchema,
  updateAdSlotSchema,
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
  const { id: adSlotId } = adSlotIdSchema.parse({ id });
  const newAdSlot = updateAdSlotSchema.parse(adSlot);
  try {
    const a = await db.adSlot.update({
      where: { id: adSlotId },
      data: newAdSlot,
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
