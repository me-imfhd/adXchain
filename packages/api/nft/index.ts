import { AdSlotId, CreateAdNftSchema, InventoryId, db } from "@repo/db";
export const createNftAndUpdateLent = async (data: CreateAdNftSchema) => {
  const adSlot = await db.adSlot.update({
    where: {
      id: data.adSlotId,
    },
    data: {
      lent: true,
      nftMintAddress: data.mintAddress,
      ownerId: data.ownerId,
      updatedAt: new Date(),
    },
  });

  return adSlot;
};

export const retrieveAdNftMintPerAdSlot = async (adSlotId: AdSlotId) => {
  const adNft = await db.adSlot.findUnique({ where: { id: adSlotId } });
  return adNft?.nftMintAddress!;
};

export const getAllAdNftsByInventory = async (inventoryId: InventoryId) => {
  const adNft = await db.inventory.findUnique({
    where: { id: inventoryId },
    include: { adSlots: true },
  });
  const mintArray = adNft?.adSlots.map((adSlot) => {
    return {
      adSlotId: adSlot.id,
      mintAddress: adSlot.nftMintAddress,
    };
  });
  return mintArray;
};
