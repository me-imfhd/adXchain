import { AdSlotId, CreateAdNftSchema, InventoryId, db } from "@repo/db";
export const createNftAndUpdateLent = async (data: CreateAdNftSchema) => {
  const project = await db.$transaction([
    db.adNft.create({
      data: {
        nftDisplayUri: data.nftDisplayUri,
        nftFileType: data.nftFileType,
        nftRedirectUri: data.nftRedirectUri,
        underdogNftId: data.underdogNftId,
        nftProject: { connect: { id: data.projectId } },
      },
    }),
    db.adSlot.update({
      where: {
        id: data.adSlotId,
      },
      data: {
        lent: true,
        nftMintAddress: data.mintAddress,
        ownerId: data.ownerId,
        updatedAt: new Date(),
      },
    }),
  ]);

  return { project };
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
