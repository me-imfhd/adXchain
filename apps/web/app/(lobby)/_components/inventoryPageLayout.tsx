import React from "react";
import { TypographyH3 } from "@repo/ui/components";
import { GetActiveInventoryById } from "@repo/api";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
export default function InventoryPageLayout({
  i,
  dialog,
  cards,
  percentage,
  supply,
  total,
  totalBuyablePrice,
}: {
  i: GetActiveInventoryById;
  totalBuyablePrice: bigint;
  dialog: React.ReactNode;
  cards: React.ReactNode;
  supply: number;
  percentage: number;
  total: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center mt-[57px]  w-full">
      <div className="grid md:grid-cols-[300px_1fr] gap-4 min-h-screen w-full">
        <div className="flex flex-col gap-2 h-full md:border-r w-full ">
          <img
            alt="Store image"
            className="aspect-video object-cover"
            height="200"
            src={i?.inventoryImageUri!}
            width="300"
          />
          <div className="flex flex-col p-2 gap-2">
            <h1 className="font-bold text-2xl">{i?.inventoryName}</h1>
            <div className="grid gap-2 text-sm leading-loose">
              <p>{i?.inventoryDescription}</p>
            </div>
          </div>
          {dialog}
        </div>
        <div>
          {i && i.adSlots.length > 0 && (
            <div className="flex flex-wrap p-4 gap-8">
              <div className="text-center ">
                <TypographyH3 className="flex justify-center text-center ">
                  <div className="flex gap-2 items-center">
                    {Number(totalBuyablePrice) / LAMPORTS_PER_SOL}{" "}
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0"
                      y="0"
                      width="22px"
                      height="22px"
                      viewBox="0 0 450 352.69"
                    >
                      <path
                        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
                        style={{ fill: "white" }}
                      ></path>
                      <path
                        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
                        style={{ fill: "white" }}
                      ></path>
                      <path
                        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                        style={{ fill: "white" }}
                      ></path>
                    </svg>
                  </div>
                </TypographyH3>
                <TypographyH3 className="text-muted-foreground font-normal">
                  TOTAL FLOOR PRICE
                </TypographyH3>
              </div>
              <div className="text-center">
                <TypographyH3>
                  {supply}/{total} &nbsp; [{percentage}]{" %"}
                </TypographyH3>
                <TypographyH3 className="text-muted-foreground font-normal">
                  LISTED/SUPPLY
                </TypographyH3>
              </div>
            </div>
          )}
          {cards}
        </div>
      </div>
    </div>
  );
}
