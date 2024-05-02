import React from "react";
import axios from "axios";
import { UnderdogNFT } from "@repo/api/types";

export default async function AdSlotComponent() {
  const adxchainURI = "https://adxchain-web.vercel.app";
  const adSlotId = "6zcgLnpApnyktSfFqu3rU6FQSXi67VkSMS6rCTftAcFZ";
  try {
    const response = await axios.get(
      `${adxchainURI}/api/publisher/getAd/${adSlotId}`
    );
    if (response?.status == 200) {
      const data = response.data as UnderdogNFT;
      return (
        <div
          id={adSlotId} // Will be used for navigating to the add directly
          className="w-screen h-screen flex justify-center items-center"
        >
          <img
            src={data.attributes.displayUri}
            className={`w-[400px] h-[400px]`} // set the dimesions as in adSlots dimension or update accordingly
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
