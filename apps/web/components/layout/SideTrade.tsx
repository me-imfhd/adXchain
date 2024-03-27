"use client";
import { Button } from "@repo/ui/components";
import React, { useState } from "react";

interface SideTradeProps {
  Price: number;
  onButtonClick: any;
}

export default function SideTrade({ Price, onButtonClick }: SideTradeProps) {
  const [NftToBuy, setNftToBuy] = useState<string>("Buy");

  return (
      <div className="w-[30rem] p-5 bg-[#252a2c] relative">
        <div className="w-full flex flex-col gap-2 justify-between">
          <button
            className="bg-[#C2C1FF] text-black w-full p-2  flex items-center gap-2 justify-center font-semibold  rounded-lg"
            onClick={() => {
              onButtonClick("Buy");
              setNftToBuy("Buy");
              return;
            }}
          >
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-black"
            >
              <path
                d="M16.7188 1.27852C16.425 0.984767 16.425 0.509767 16.7188 0.219142C17.0125 -0.0714828 17.4875 -0.0746078 17.7781 0.219142L19.7781 2.21914C19.9188 2.35977 19.9969 2.55039 19.9969 2.75039C19.9969 2.95039 19.9188 3.14102 19.7781 3.28164L17.7781 5.28164C17.4844 5.57539 17.0094 5.57539 16.7188 5.28164C16.4281 4.98789 16.425 4.51289 16.7188 4.22227L17.4375 3.50352L12 3.49727C11.5844 3.49727 11.25 3.16289 11.25 2.74727C11.25 2.33164 11.5844 1.99727 12 1.99727H17.4406L16.7188 1.27852ZM3.28125 11.7785L2.5625 12.4973H8C8.41562 12.4973 8.75 12.8316 8.75 13.2473C8.75 13.6629 8.41562 13.9973 8 13.9973H2.55938L3.27813 14.716C3.57188 15.0098 3.57188 15.4848 3.27813 15.7754C2.98438 16.066 2.50938 16.0691 2.21875 15.7754L0.21875 13.7785C0.078125 13.6379 0 13.4473 0 13.2473C0 13.0473 0.078125 12.8566 0.21875 12.716L2.21875 10.716C2.5125 10.4223 2.9875 10.4223 3.27813 10.716C3.56875 11.0098 3.57188 11.4848 3.27813 11.7754L3.28125 11.7785ZM3 1.99727H10.5594C10.4437 2.22227 10.375 2.47539 10.375 2.74727C10.375 3.64414 11.1031 4.37227 12 4.37227H15.6687C15.5437 4.90352 15.6875 5.48164 16.1 5.89727C16.7344 6.53164 17.7625 6.53164 18.3969 5.89727L19 5.29414V11.9973C19 13.1004 18.1031 13.9973 17 13.9973H9.44063C9.55625 13.7723 9.625 13.5191 9.625 13.2473C9.625 12.3504 8.89688 11.6223 8 11.6223H4.33125C4.45625 11.091 4.3125 10.5129 3.9 10.0973C3.26562 9.46289 2.2375 9.46289 1.60312 10.0973L1 10.7004V3.99727C1 2.89414 1.89688 1.99727 3 1.99727ZM5 3.99727H3V5.99727C4.10313 5.99727 5 5.10039 5 3.99727ZM17 9.99727C15.8969 9.99727 15 10.8941 15 11.9973H17V9.99727ZM10 10.9973C10.7956 10.9973 11.5587 10.6812 12.1213 10.1186C12.6839 9.55598 13 8.79292 13 7.99727C13 7.20162 12.6839 6.43856 12.1213 5.87595C11.5587 5.31334 10.7956 4.99727 10 4.99727C9.20435 4.99727 8.44129 5.31334 7.87868 5.87595C7.31607 6.43856 7 7.20162 7 7.99727C7 8.79292 7.31607 9.55598 7.87868 10.1186C8.44129 10.6812 9.20435 10.9973 10 10.9973Z"
                fill="#C2C1FF"
              />
            </svg>
            Buy
          </button>
          <button
            className="bg-[#181C1E] w-full text-[#d9dbdf] p-2 flex items-center gap-2 justify-center font-semibold  rounded-lg"
            onClick={() => {
              onButtonClick("Sell");
              setNftToBuy("Sell");
              return;
            }}
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 1C2 0.446875 1.55313 0 1 0C0.446875 0 0 0.446875 0 1V11.5C0 12.8813 1.11875 14 2.5 14H15C15.5531 14 16 13.5531 16 13C16 12.4469 15.5531 12 15 12H2.5C2.225 12 2 11.775 2 11.5V1ZM14.7063 3.70625C15.0969 3.31563 15.0969 2.68125 14.7063 2.29063C14.3156 1.9 13.6812 1.9 13.2906 2.29063L10 5.58437L8.20625 3.79063C7.81563 3.4 7.18125 3.4 6.79063 3.79063L3.29063 7.29062C2.9 7.68125 2.9 8.31563 3.29063 8.70625C3.68125 9.09688 4.31563 9.09688 4.70625 8.70625L7.5 5.91563L9.29375 7.70938C9.68437 8.1 10.3188 8.1 10.7094 7.70938L14.7094 3.70937L14.7063 3.70625Z"
                fill="#C2C1FF"
              />
            </svg>
            Sell
          </button>
        </div>
          <SideTradeDown NftToBuy={NftToBuy} Price={Price}/>
      </div>
  );
}

interface SideTradeDownProps{
  NftToBuy:string;
  Price:number
}

const SideTradeDown:React.FC<SideTradeDownProps> = ({NftToBuy, Price}) =>{
  return (
    <div className="p-5">
          <p className="text-white font-semibold">NFT to {NftToBuy}</p>
          <button className="bg-[#C2C1FF] text-black w-full p-2 mt-2  flex items-center gap-2 justify-center font-semibold  rounded-lg">
            Buy at {Price}
          </button>
        </div>
  )
}