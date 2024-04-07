import React from "react";
import axios from "axios";

export interface NFT {
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
}
type GetAd = {
  slotId: string;
  ad: NFT;
} | null;

export default async function Page() {
  const adxchainURI = "https://adxchain-web.vercel.app";
  const adSlotId = "cluon5jbp00065pnjage76sko";
  try {
    const response = await axios.get(
      `${adxchainURI}/api/publisher/getAd/${adSlotId}`,
      { params: { network: "devnet" } }
    );
    if (response?.status == 200) {
      const data = response.data as GetAd;
      return (
        <div
          id={data?.slotId} // Will be used for navigating to the add directly
          className="w-screen h-screen flex justify-center items-center"
        >
          {data?.ad.attributes.displayUri && (
            <img
              src={data.ad.attributes.displayUri}
              className="w-[400px] h-[400px]" // set the dimesions as in adSlots dimension or update accordingly
            />
          )}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img
        src={""} // default placeholder
        className="w-[400px] h-[400px]" // set the dimesions as in adSlots dimension or update accordingly
      />
    </div>
  );
}
