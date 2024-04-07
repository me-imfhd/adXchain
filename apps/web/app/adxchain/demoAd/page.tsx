import React from "react";
import axios from "axios";

type GetAd = {
  slotId: string;
  minted: boolean;
  ad: {
    displayUri: string;
  };
};

export default async function AdSlotComponent() {
  const adxchainURI = "https://adxchain-web.vercel.app";
  const adSlotId = "clupviled0003sc62onlnb05d";
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
          <img
            src={data.ad.displayUri}
            className="w-[400px] h-[400px]" // set the dimesions as in adSlots dimension or update accordingly
          />
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
