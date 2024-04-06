import { AdSlotId, CreateAdNftSchema, db } from "@repo/db";
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
