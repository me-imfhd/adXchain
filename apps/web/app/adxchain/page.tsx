import React from "react";
import axios from "axios";

type Ad = {
  mintAddress: string;
  status: string;
  ownerAddress: string;
  claimerAddress: string | null;
  collectionAddress: string;
  delegated: boolean;
  core: boolean;
  uri: string | null;
  name: string;
  image: string;
  attributes: {
    displayUri: string;
    fileType: string;
  };
};

type responseArray = {
  slotId: string;
  ads: Ad | null | undefined;
}[];

export default async function Page() {
  const adxchainURI = "https://adxchain-web.vercel.app/";
  const inventoryId = "cluomxiqq00025pnj2boy225o";
//   const response = await axios.get(
//     `${adxchainURI}/api/publisher/getAds/${inventoryId}?network=devnet`
//   );
//   const adsArray = response.data as responseArray;

  return <div>{}</div>;
}
