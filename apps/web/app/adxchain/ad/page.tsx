"use client";
import React, { useEffect, useState } from "react";
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
        } else {
          console.error("Failed to fetch ad data", response.status);
          setData(null);
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
      <img
        src={data.ad.attributes.displayUri}
        className="w-[400px] h-[400px]"
      />
    </div>
  );
};

export default Page;
