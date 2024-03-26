"use client";
import { Button, IconButton } from "@repo/ui/components";
import {
  ActionButton,
  GlowingButton,
  ShinyButton,
} from "@repo/ui/components/buttons";
import { ArrowLeft, Icons } from "@repo/ui/icons";
import React, { useState } from "react";
import { number } from "zod";

interface SideTradeProps {
  Price: number;
  onButtonClick: any;
}

export default function SideTrade({ Price, onButtonClick }: SideTradeProps) {
  const [hidden, setHidden] = useState<boolean>(false);
  const [NftToBuy, setNftToBuy] = useState<string>("Buy");

  const handleClick = () => {
    setHidden((prev) => !prev);
  };

  return (
    <>
      {!hidden && (
        <div className=" w-1/2 p-5 bg-[#252a2c] relative">
          <div className="w-full flex gap-2 justify-between">
            <button
              className="bg-[#0C271B] w-1/2 p-2 rounded-lg"
              onClick={() => {
                onButtonClick("Buy");
                setNftToBuy("Buy");
                return;
              }}
            >
              Buy
            </button>
            <button
              className="bg-[#181C1E] w-1/2 text-[#565D6D] p-2 rounded-lg"
              onClick={() => {
                onButtonClick("Sell");
                setNftToBuy("Sell");
                return;
              }}
            >
              Sell
            </button>
          </div>
          <div>
            <p>NFT to {NftToBuy}</p>
            <GlowingButton size="lg">Buy at {Price}</GlowingButton>
          </div>
          {/* Svg for closing the SideTrade */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="15"
            height="15"
            viewBox="0,0,256,256"
            onClick={handleClick}
            className="cursor-pointer absolute left-[95%] top-0"
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M4.70703,3.29297l-1.41406,1.41406l7.29297,7.29297l-7.29297,7.29297l1.41406,1.41406l7.29297,-7.29297l7.29297,7.29297l1.41406,-1.41406l-7.29297,-7.29297l7.29297,-7.29297l-1.41406,-1.41406l-7.29297,7.29297z"></path>
              </g>
            </g>
          </svg>
        </div>
      )}
      {hidden && (
        <div className=" w-10 flex justify-start items-center">
          <ArrowLeft
            className="rotate-180 cursor-pointer"
            onClick={handleClick}
          />
        </div>
      )}
    </>
  );
}
