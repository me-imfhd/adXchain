"use client";
import { GetInventoryById } from "@repo/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TypographyH3,
} from "@repo/ui/components";
import { GlowingButton } from "@repo/ui/components/buttons";
import { ExternalLink } from "@repo/ui/icons";
import Link from "next/link";
import React, { useState } from "react";

interface MarketPageProps {
  inventory: GetInventoryById;
  lent: number;
  total: number;
}

export default function MarketPage({
  inventory,
  lent,
  total,
}: MarketPageProps) {
  const supply = total - lent;
  const percentage = (supply / total) * 100;
  const [adSlotToPriceMapping, setAdslotToPriceMapping] = useState(new Map());
  const [adPrice, setAdPrice] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (id: string, name: string, img:string, price: number) => {
    const mp = new Map(adSlotToPriceMapping);
    if (mp.has(id)) {
      if (adPrice !== 0) setAdPrice((prev) => prev - price);
      mp.delete(id);
    } else {
      setAdPrice((prev) => prev + price);
      mp.set(id, price);
    }
    setAdslotToPriceMapping(mp);
    setIsSelected((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-14  w-full">
      <div className="grid md:grid-cols-[300px_1fr] gap-4 min-h-screen">
        <div className="flex flex-col gap-2 h-full md:border-r ">
          <img
            alt="Store image"
            className="aspect-video object-cover"
            height="200"
            src={inventory?.inventoryImageUri!}
            width="300"
          />
          <div className="flex flex-col p-2 gap-2">
            <h1 className="font-bold text-2xl">{inventory?.inventoryName}</h1>
            <div className="grid gap-2 text-sm leading-loose">
              <p>{inventory?.inventoryDescription}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <GlowingButton>
                BUY {adPrice != 0 && <span>ADNFT {adPrice} SOL</span>}
              </GlowingButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="text-center">Execute</DialogTitle>
              </DialogHeader>
              {adPrice === 0 ? (
                <span className="text-center text-red-600">
                  didn't select any NFT!
                </span>
              ) : (
                <>
                  <div className="flex items-start flex-wrap justify-between p-2">
                    <div className="flex flex-col gap-4 items-start w-[70%] border-solid border p-3">
                      {Array.from(adSlotToPriceMapping).map(([slot, price]) => {
                        const id = slot.slice(0, 7);
                        return (
                          <div key={slot} className="flex gap-4">
                            <Badge
                              className="bg-secondary text-primary font-medium "
                              size={"xs"}
                            >
                              BUY
                            </Badge>
                            <span>#{id}</span>
                            <span className="flex items-center gap-1">
                              <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                y="0"
                                width="16px"
                                height="16px"
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
                              {price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col w-[30%] border-solid border p-3 items-end">
                      {Array.from(adSlotToPriceMapping).map(([slot, price]) => {
                        return (
                          <div key={slot} className="flex gap-4">
                            <span className="flex items-center gap-1">
                              {price}
                            </span>
                          </div>
                        );
                      })}
                      <div className="border-solid border-y p-2 flex justify-between items-center font-semibold w-full">
                        <span>Total:</span>{" "}
                        <span className="flex items-center gap-1">
                          <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            width="16px"
                            height="16px"
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
                          {adPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="secondary"
                      className="font-semibold"
                    >
                      Pay: {adPrice} SOL
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {inventory && inventory.adSlots.length > 0 && (
            <div className="flex flex-wrap p-4 gap-8">
              <div className="text-center">
                <TypographyH3>{inventory?.adSlots[0]?.slotPrice}</TypographyH3>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
            {inventory?.adSlots.length === 0
              ? "This inventory has not ad slots listed."
              : inventory?.adSlots.map((adSlot: any) => {
                  const walletAddress = adSlot.ownerAddress;
                  const wa =
                    walletAddress?.slice(0, 4) +
                    ".." +
                    walletAddress?.slice(-4);
                  return (
                    <Card
                      className="rounded-lg"
                      onClick={() => handleClick(adSlot.id, adSlot.slotName, adSlot.slotImageUri, adSlot.slotPrice)}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="aspect-video overflow-hidden ">
                          <img
                            alt="Collection Image"
                            className="object-cover rounded-xl"
                            height="225"
                            src={adSlot.slotImageUri!}
                            style={{
                              aspectRatio: "400/225",
                              objectFit: "cover",
                            }}
                            width="400"
                          />
                        </div>
                        <CardContent className="pt-3 px-2">
                          <div className="grid gap-3">
                            <div className="flex flex-row items-center justify-between">
                              <h3 className="font-semibold text-xl">
                                {adSlot.slotName}
                              </h3>
                              <Badge
                                className="bg-secondary text-primary font-medium "
                                size={"xs"}
                              >
                                {adSlot.slotPlatform}
                              </Badge>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Floor Price :
                                </span>
                                <span>{adSlot.slotPrice} sol</span>
                              </p>
                              <p className="text-sm leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Slot Area :
                                </span>
                                <span>{`${adSlot.slotWidth}% x ${adSlot.slotLength}% `}</span>
                              </p>
                              <p className="text-sm leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Ad Space Type :
                                </span>
                                <span>{adSlot.slotType}</span>
                              </p>
                              {adSlot.ownerAddress?.length &&
                                adSlot.ownerAddress?.length > 1 && (
                                  <p className="text-sm leading-none flex justify-between gap-2">
                                    <span className="text-muted-foreground font-medium">
                                      Renter :
                                    </span>
                                    <span>{wa}</span>
                                  </p>
                                )}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                          <Link
                            className="flex items-center gap-2 hover:underline  hover:-translate-y-[1px]"
                            href={adSlot.slotWebsiteUri}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Website
                          </Link>
                        </CardFooter>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
