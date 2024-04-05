import React from "react";
import { TypographyH3 } from "@repo/ui/components";
import { GetInventoryById } from "@repo/api";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
export default function InventoryPageLayout({
  i,
  dialog,
  cards,
  percentage,
  supply,
  total,
}: {
  i: GetInventoryById;
  dialog: React.ReactNode;
  cards: React.ReactNode;
  supply: number;
  percentage: number;
  total: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center mt-[57px]  w-full">
      <div className="grid md:grid-cols-[300px_1fr] gap-4 min-h-screen">
        <div className="flex flex-col gap-2 h-full md:border-r ">
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
              <div className="text-center">
                <TypographyH3>
                  {Number(i?.adSlots[0]?.slotPrice) / LAMPORTS_PER_SOL}
                </TypographyH3>
                <TypographyH3 className="text-muted-foreground font-normal">
                  BUY NOW
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
