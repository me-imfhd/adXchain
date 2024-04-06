import { AdSlotId, CreateAdNftSchema, db } from "@repo/db";
export const createNftAndUpdateLent = async (data: CreateAdNftSchema) => {
  const project = await db.$transaction([
    db.adNft.create({
      data: { ...data },
    }),
    db.adSlot.update({
      where: {
        id: data.adSlotId.id,
      },
      data: { lent: true },
    }),
  ]);

  return { project };
};
