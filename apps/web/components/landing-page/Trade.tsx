"use client"
import React, { useState } from "react";
import SideTrade from "../layout/SideTrade";
import { NFTCard } from "../layout/NFTCard";
import imgURL from "@/public/images/image.png"


export default function Trade(){
  const [totalPrice, setTotalPrice] = useState(0);
  const [NFTNameToPriceMapping, setNFTNameToPriceMapping] = useState(new Map());
  const [action, setAction] = useState('Buy');

  const handleButtonClick = (action: React.SetStateAction<string>) => {
     setAction(action);
  };

  const handleCardSelection = (NFTName:string, price:string) => {
     const Price = Number(price);
 
     const newMapping = new Map(NFTNameToPriceMapping);
 
     if (newMapping.has(NFTName)) {
       // If it is, remove it from the map and subtract its price from the total
       setTotalPrice(prev => prev - Price);
       newMapping.delete(NFTName);
     } else {
       // If it's not, add it to the map and add its price to the total
       newMapping.set(NFTName, Price);
       setTotalPrice(prev => prev + Price);
     } 
     setNFTNameToPriceMapping(newMapping);
  };
  
    return (
          <div className="bg-cover h-screen flex justify-between bg-center w-full bg-[#111314] px-10  pt-14 md:pt-14 lg:pt-16 xl:px-0">
            <SideTrade Price = {totalPrice} onButtonClick={handleButtonClick}/>
            <div className="flex flex-wrap gap-2 px-10 relative overflow-y-auto">
              {action === "Buy" && <>
              <NFTCard imgURL={imgURL} NFTName={"collection 1"} Price={"1"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 2"} Price={"2"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 3"} Price={"3"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 4"} Price={"4"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 5"} Price={"5"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 6"} Price={"6"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 7"} Price={"7"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 8"} Price={"8"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 9"} Price={"9"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 10"} Price={"10"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 11"} Price={"11"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              </>}
              {
              action === "Sell" && 
              <>
              <NFTCard imgURL={imgURL} NFTName={"collection 12"} Price={"12"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 13"} Price={"13"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 14"} Price={"14"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 15"} Price={"15"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 16"} Price={"16"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 17"} Price={"17"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 18"} Price={"18"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 19"} Price={"19"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              <NFTCard imgURL={imgURL} NFTName={"collection 20"} Price={"20"} BuyPrice={"xxxx"} SellPrice={"xxxx"} BID={"xxxx"} onSelect={(NFTName:string, price:string) => handleCardSelection(NFTName, price)}/>
              </>
            }
            </div>
         </div>
    )
}