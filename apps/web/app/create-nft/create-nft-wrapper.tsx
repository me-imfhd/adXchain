"use client";
import { CreateNFTCollectionForm } from "@/components/layout/CreateNFTCollectionForm";
import { CreateNFTForm } from "@/components/layout/CreateNFTForm";

import React, { useState } from "react";
import { set } from "react-hook-form";

const CreateNFTWrapper = () => {
  const [selectedNFTType, setSelectedNFTType] = useState<string>("");

  const handleChange = (e: any) => {
    setSelectedNFTType(e.target.value);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-start gap-2 mb-10">
        <h1 className="text-white text-3xl font-bold">Create NFT</h1>
        <p className=" text-[#9a9595] text-lg">
          Welcome to our user-friendly platform where you can effortlessly mint
          NFTs on the Solana blockchain without any coding skills. Our
          streamlined process empowers artists and creators to showcase their
          digital assets by offering an intuitive interface, allowing
          customization of metadata and other details. Leveraging the speed and
          efficiency of the Solana blockchain, you can mint your unique NFTs in
          just a few simple steps: upload your digital masterpiece, customize
          details, preview, and hit the mint button. Join the NFT revolution and
          start your journey without the hassle of coding.
        </p>
      </div>
      <select
        onChange={handleChange}
        className="w-1/2 h-10 text-white bg-[#252a2c] border-2 border-gray-100 rounded-xl px-8 mb-10"
      >
        <option value="">Select NFT Type</option>
        <option value="NFT">NFT</option>
        <option value="NFT Collection">NFT Collection</option>
      </select>
      {selectedNFTType === "NFT" && <CreateNFTForm />}
      {selectedNFTType === "NFT Collection" && <CreateNFTCollectionForm />}
    </div>
  );
};

export default CreateNFTWrapper;
