"use client";
import React from "react";

interface NFTDemoProps {
  NFTName: string;
  NFTDescription: string;
  NFTImage: string;
  NFTAnimation: string;
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
    <div className="border-2 border-slate-500-500 h-52 p-5 mt-10 rounded-md">
      {NFTName ? <h1>{NFTName}</h1> : <h1>Demo</h1>}
      {NFTDescription && <p>{NFTDescription}</p>}
      {NFTImage && (
        <img src={URL.createObjectURL(new Blob([NFTImage]))} alt={NFTName} />
      )}
      {NFTWebsite && <a href={NFTWebsite}>{NFTWebsite}</a>}
      {NFTSymbol && <p>{NFTSymbol}</p>}
      {NFTMutable && <p>{NFTMutable ? "Mutable" : "not mutable"}</p>}
      {NFTCategory && <p>{NFTCategory}</p>}
      {/* <ul>
      {Object.entries(NFTAttribute?).map(([key, value]) => (
        <li key={key}>
          <strong>{key}</strong>: {value}
        </li>
      ))}
    </ul> */}
    </div>
  );
};

export default NFTDemo;
