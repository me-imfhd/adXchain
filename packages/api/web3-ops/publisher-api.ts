import axios from "axios";
import { db } from "@repo/db";
import { NFTAttributes } from "./types";

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
      const data = retrieveNft.data.attributes as NFTAttributes;
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
      slotImageUri: true,
      owner: { select: { walletAddress: true } },
    },
  });
  if (!adSlot?.nftMintAddress) {
    return {
      slotId,
      minted: false,
      ad: {
        displayUri: adSlot?.slotImageUri!,
      },
    };
  }
  const retrieveNft = await axios.get(
    `${underdogApiEndpoint}/v2/nfts/${adSlot.nftMintAddress}`
  );
  const data = retrieveNft.data.attributes as NFTAttributes;

  return {
    slotId,
    minted: true,
    ad: {
      displayUri: data.displayUri,
    },
  };
};

export type GetAd = Awaited<ReturnType<typeof getAd>>;
