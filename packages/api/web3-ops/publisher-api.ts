import axios from "axios";
import { db } from "@repo/db";
import { NFT } from "./types";

export const getAds = async (
  inventoryId: string,
  underdogApiEndpoint: string
) => {
  const adNft = await db.inventory.findUnique({
    where: { id: inventoryId },
    include: { adSlots: true },
  });

  const mintAddresses =
    adNft?.adSlots.map((adSlot) => adSlot.nftMintAddress) || [];

  const ads = await Promise.all(
    mintAddresses.map(async (mint) => {
      if (mint === null) {
        return null;
      }
      const retrieveNft = await axios.get(
        `${underdogApiEndpoint}/v2/nfts/${mint}`
      );
      const data = retrieveNft.data as NFT;
      return data;
    })
  );

  const combinedData =
    adNft?.adSlots.map((adSlot, index) => ({
      slotId: adSlot.id,
      ads: ads[index],
    })) || [];

  return combinedData;
};
export type GetAds = Awaited<ReturnType<typeof getAds>>;

export const getAd = async (slotId: string, underdogApiEndpoint: string) => {
  const adSlot = await db.adSlot.findUnique({
    where: { id: slotId },
    select: {
      nftMintAddress: true,
      owner: { select: { walletAddress: true } },
    },
  });
  if (!adSlot?.nftMintAddress) {
    return null;
  }
  const retrieveNft = await axios.get(
    `${underdogApiEndpoint}/v2/nfts/${adSlot.nftMintAddress}`
  );
  const data = retrieveNft.data as NFT;
  return {
    slotId,
    ad: data,
  };
};
export type GetAd = Awaited<ReturnType<typeof getAd>>;
