import axios from "axios";
import { db } from "@repo/db";
import { Ad } from "./types";

export const getAds = async (
  inventoryId: string,
  underdogApiEndpoint: string,
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
        `${underdogApiEndpoint}/v2/nfts/${mint}`,
      );
      const data = retrieveNft.data as Ad;
      return data;
    }),
  );

  const combinedData =
    adNft?.adSlots.map((adSlot, index) => ({
      slotId: adSlot.id,
      ads: ads[index],
    })) || [];

  return combinedData;
};
export type GetAds = Awaited<ReturnType<typeof getAds>>;
