"use client";
import Link from "next/link";
import React from "react";

interface NFTDemoProps {
  NFTName: string;
  NFTDescription: string;
  NFTImage: File | null;
  NFTAnimation?: File | null;
  NFTWebsite: string;
  NFTSymbol: string;
  NFTMutable: boolean;
  NFTCategory: string;
  NFTAttribute?: Record<string, string>;
}

const NFTDemo: React.FC<NFTDemoProps> = ({
  NFTName,
  NFTAnimation,
  NFTAttribute,
  NFTCategory,
  NFTDescription,
  NFTImage,
  NFTMutable,
  NFTSymbol,
  NFTWebsite,
}) => {

  return (
    <div className="border-2 border-slate-500-500 flex flex-wrap justify-between p-5 mt-10 rounded-md">
      <div className="p-3 flex items-start flex-col gap-2">
        <h1 className="text-2xl font-semibold">
          {NFTName ? NFTName : "DEMO OF YOUR NFT"}
        </h1>
        {NFTDescription && <span className="text-xl">{NFTDescription}</span>}
        {NFTWebsite && (
          <Link
            href={NFTWebsite}
            className="text-blue-400 text-lg hover:underline"
          >
            {NFTWebsite}
          </Link>
        )}
        {NFTSymbol && (
          <span className="text-slate-400 text-lg">{NFTSymbol}</span>
        )}
        {NFTMutable && (
          <p className="text-slate-300 text-lg">
            Mutable
          </p>
        )}
        {NFTCategory && <p>Category:{NFTCategory}</p>}
        {/* attributes here */}
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {NFTImage && (
          <img
            src={URL.createObjectURL(new Blob([NFTImage]))}
            alt={"NFTImage"}
            height={200}
            width={200}
          />
        )}
        {NFTAnimation && (
          <img
            src={URL.createObjectURL(new Blob([NFTAnimation]))}
            alt={"NFTAnimation"}
            height={200}
            width={200}
          />
        )}
      </div>
    </div>
  );
};

export default NFTDemo;
