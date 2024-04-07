"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type GetAd = {
  slotId: string;
  minted: boolean;
  ad: {
    displayUri: string;
  };
};

const Page = () => {
  const adxchainURI = "https://adxchain-web.vercel.app";
  const [data, setData] = useState<GetAd | null>(null);
  const adSlotId = "cluplx4lx0004ad0d90rgwm29";

  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await axios.get(
          `${adxchainURI}/api/publisher/getAd/${adSlotId}`,
          { params: { network: "devnet" } }
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching ad data", error);
        setData(null);
      }
    };
    getAds();
  }, []);

  if (!data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <img
          src="" // Default placeholder image
          className="w-[400px] h-[400px]"
        />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={data.ad.displayUri} className="w-[400px] h-[400px]" />
    </div>
  );
};

export default Page;
