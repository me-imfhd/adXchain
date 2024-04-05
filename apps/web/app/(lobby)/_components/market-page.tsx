"use client";
import BuyMultiple from "@/app/buy/_buyMultipleAdNFTs";
import { GetInventoryById } from "@repo/api";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  useToast,
} from "@repo/ui/components";
import { GlowingButton } from "@repo/ui/components/buttons";
import { ExternalLink, Upload } from "@repo/ui/icons";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import InventoryPageLayout from "./inventoryPageLayout";
import { Session } from "@repo/auth";
import { SelectedSlotSchema } from "@repo/db";

interface MarketPageProps {
  inventory: NonNullable<GetInventoryById>;
  supply: number;
  percentage: number;
  total: number;
  lent: number;
  session: Session;
}

export default function MarketPage({
  inventory,
  percentage,
  supply,
  session,
  total,
}: MarketPageProps) {
  const [adSlotToPriceMapping, setAdslotToPriceMapping] = useState<
    Map<string, [string, string, number]>
  >(new Map());
  const [files, setFiles] = useState<File[]>([]);

  const [adPrice, setAdPrice] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const toast = useToast().toast;
  const selectedSlots: SelectedSlotSchema[] = [];
  const handleClick = (
    id: string,
    name: string,
    img: string,
    price: number
  ) => {
    const mp = new Map(adSlotToPriceMapping);
    if (mp.has(id)) {
      if (adPrice !== 0) setAdPrice((prev) => prev - price);
      mp.delete(id);
    } else {
      setAdPrice((prev) => prev + price);
      mp.set(id, [name, img, price]);
    }
    setAdslotToPriceMapping(mp);
    setIsSelected((prev) => !prev);
  };
  return (
    <InventoryPageLayout
      percentage={percentage}
      supply={supply}
      total={total}
      i={inventory}
      dialog={
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
                    {Array.from(adSlotToPriceMapping).map(([slot, value]) => {
                      selectedSlots.push({
                        id: slot,
                        slotName: value[0] as string,
                        slotImageUri: value[1] as string,
                      });
                      return (
                        <div key={slot} className="flex gap-5 w-full">
                          <Badge
                            className="bg-secondary text-primary font-medium "
                            size={"xs"}
                          >
                            BUY
                          </Badge>
                          <img
                            className="object-cover rounded-lg"
                            src={value[1] as string}
                            style={{
                              aspectRatio: "25/25",
                              objectFit: "cover",
                            }}
                            width={25}
                            height={25}
                          />
                          <div className="flex justify-between w-full">
                            <span>{value[0]}</span>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                {value[2]}
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
                              </span>
                              <span>
                                <button
                                  onClick={() =>
                                    document.getElementById("picture")?.click()
                                  }
                                >
                                  <Upload />
                                  <Input
                                    id="picture"
                                    type="file"
                                    className="hidden"
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const currentFiles = files
                                        ? [...files]
                                        : [];
                                      if (e.target.files?.[0]) {
                                        setFiles([
                                          ...currentFiles,
                                          e.target.files[0],
                                        ]);
                                        toast({ title: "Image Uploaded" });
                                      }
                                    }}
                                  />
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col w-[30%] border-solid border p-3 items-end">
                    {Array.from(adSlotToPriceMapping).map(([slot, value]) => {
                      return (
                        <div key={slot} className="flex gap-4">
                          <span className="flex items-center gap-1">
                            {value[2]}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-solid border-y p-2 flex justify-between items-center font-semibold w-full">
                      <span>Total:</span> {adPrice}
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
                      </span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button
                          variant="secondary"
                          className="font-semibold flex items-center"
                        >
                          <span>Pay</span>
                          <span className="flex items-center gap-1">
                            {adPrice}
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
                          </span>
                        </Button>
                      </DialogClose>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Confirm Transaction</DialogHeader>
                      <BuyMultiple
                        inventoryImageUri={inventory?.inventoryImageUri!}
                        inventoryName={inventory?.inventoryName!}
                        session={session}
                        transactionAmount={adPrice}
                        selectedSlots={selectedSlots}
                        files={files}
                      />
                    </DialogContent>
                  </Dialog>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      }
      cards={
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start p-3">
          {inventory?.adSlots.length === 0
            ? "This inventory has not ad slots listed."
            : inventory?.adSlots.map((adSlot: any) => {
                const walletAddress = adSlot.ownerAddress;
                const wa =
                  walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4);
                return (
                  <Card
                    onClick={() => {
                      handleClick(
                        adSlot.id,
                        adSlot.slotName,
                        adSlot.slotImageUri,
                        adSlot.slotPrice
                      );
                    }}
                    className="rounded-lg"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="aspect-video overflow-hidden ">
                        <img
                          alt="Collection Image"
                          className="object-cover rounded-lg"
                          height="275"
                          src={adSlot.slotImageUri!}
                          style={{
                            aspectRatio: "400/275",
                            objectFit: "cover",
                          }}
                          width="400"
                        />
                      </div>
                      <div className="pt-3 px-2">
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
                            {/* {adSlot.ownerAddress?.length &&
                              adSlot.ownerAddress?.length > 1 && (
                                <p className="text-sm leading-none flex justify-between gap-2">
                                  <span className="text-muted-foreground font-medium">
                                    Renter :
                                  </span>
                                  <span>{wa}</span>
                                </p>
                              )} */}
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2  flex  items-center justify-between">
                        <Link
                          className="flex items-center gap-2 hover:underline  hover:-translate-y-[1px]"
                          href={adSlot.slotWebsiteUri}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Website
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
        </div>
      }
    ></InventoryPageLayout>
  );
}
