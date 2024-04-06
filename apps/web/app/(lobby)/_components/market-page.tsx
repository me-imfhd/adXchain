"use client";
import BuyMultiple from "@/app/buy/_buyMultipleAdNFTs";

import { GetActiveInventoryById, GetInventoryById } from "@repo/api";
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
import React, { ChangeEvent, useEffect, useState } from "react";
import InventoryPageLayout from "./inventoryPageLayout";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SlotMap } from "../market/[inventory]/page";
import { Session } from "@repo/auth";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface MarketPageProps {
  inventory: NonNullable<GetActiveInventoryById>;
  totalBuyablePrice: bigint;
  supply: number;
  percentage: number;
  total: number;
  session: Session;
  initial: SlotMap[];
}

export default function MarketPage({
  inventory,
  percentage,
  totalBuyablePrice,
  supply,
  session,
  total,
  initial,
}: MarketPageProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<bigint>(0n);
  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(BigInt(updatedAccountInfo.lamports));
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(BigInt(info?.lamports!));
    });
  }, [connection, publicKey]);
  const [slotsArray, setSlotsArray] = useState<SlotMap[]>(initial);
  const selectedSlots = slotsArray.filter((slot) => slot.isSelected);

  const totalPrice = slotsArray
    .filter((slot) => slot.isSelected && !slot.isRented)
    .reduce((accumulator, slot) => accumulator + slot.price, BigInt(0));
  const toast = useToast().toast;
  const handleClick = (id: string) => {
    console.log(slotsArray);
    const updatedSlotsArray = slotsArray.map((slot) => {
      if (slot.id === id) {
        return { ...slot, isSelected: !slot.isSelected };
      } else {
        return slot;
      }
    });
    setSlotsArray(updatedSlotsArray);
    console.log(slotsArray);
  };
  return (
    <InventoryPageLayout
      totalBuyablePrice={totalBuyablePrice}
      percentage={percentage}
      supply={supply}
      total={total}
      i={inventory}
      dialog={
        <Dialog>
          <DialogTrigger asChild>
            <GlowingButton
              className="w-full"
              disabled={totalPrice == BigInt(0)}
            >
              BUY
              <span className=" flex items-center gap-1">
                at {Number(totalPrice) / LAMPORTS_PER_SOL}
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
            </GlowingButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-center">Execute</DialogTitle>
            </DialogHeader>
            <>
              <div className="flex items-start flex-wrap justify-between p-2">
                <div className="flex flex-col gap-4 items-start w-[64%] border-solid border p-3">
                  {selectedSlots.map((adSlot) => {
                    return (
                      <div
                        key={adSlot.id}
                        className="flex gap-5 w-full items-center"
                      >
                        <Badge
                          className="bg-secondary text-primary font-medium "
                          size={"xs"}
                        >
                          BUY
                        </Badge>
                        <img
                          className="object-cover rounded-lg"
                          src={adSlot.imageUri}
                          style={{
                            aspectRatio: "25/25",
                            objectFit: "cover",
                          }}
                          width={25}
                          height={25}
                        />
                        <div className="flex justify-between w-full items-center">
                          <span>{adSlot.slotName}</span>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              {Number(adSlot.price) / LAMPORTS_PER_SOL}
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
                              <Button
                                onClick={() => {
                                  document
                                    .getElementById(`picture-${adSlot.id}`)
                                    ?.click();
                                }}
                                variant="outline"
                                size="icon"
                              >
                                {adSlot.file ? (
                                  <img
                                    className="object-cover rounded-lg"
                                    src={URL.createObjectURL(
                                      new Blob([adSlot.file])
                                    )}
                                    style={{
                                      aspectRatio: "25/25",
                                      objectFit: "cover",
                                    }}
                                    width={25}
                                    height={25}
                                  />
                                ) : (
                                  <Upload className="size-4" />
                                )}

                                <Input
                                  id={`picture-${adSlot.id}`}
                                  type="file"
                                  className="hidden"
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (e.target.files?.[0]) {
                                      toast({ title: "Image Added." });
                                      const updatedSlots = slotsArray.map(
                                        (slot) => {
                                          if (slot.id === adSlot.id) {
                                            return {
                                              ...slot,
                                              file: e.target.files?.[0],
                                            };
                                          }
                                          return slot;
                                        }
                                      );
                                      setSlotsArray(updatedSlots);
                                    }
                                  }}
                                />
                              </Button>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col w-[35%] border-solid border p-3 items-end">
                  {selectedSlots.map((adSlot) => {
                    return (
                      <div key={adSlot.id} className="flex gap-4">
                        <span className="flex items-center gap-1">
                          {Number(adSlot.price) / LAMPORTS_PER_SOL}
                        </span>
                      </div>
                    );
                  })}
                  <div className="border-solid border-y p-2 flex justify-between items-center font-semibold w-full">
                    <span>Total</span>{" "}
                    <div className="flex-1 flex gap-2 justify-end">
                      <span>{Number(totalPrice) / LAMPORTS_PER_SOL}</span>
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
                  <div className="border-solid border-y p-2 flex justify-between items-center font-semibold w-full">
                    <span>Balance</span>
                    <div className="flex-1 flex gap-2 justify-end">
                      <span
                        className={`${balance < totalPrice ? "text-red-500" : "text-green-500"}`}
                      >
                        {Number(balance) / LAMPORTS_PER_SOL}
                      </span>
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
              </div>
              <DialogFooter>
                {publicKey && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="font-semibold flex items-center"
                        disabled={BigInt(balance) < totalPrice}
                      >
                        <span>Pay</span>
                        <span className="flex items-center gap-1">
                          {Number(totalPrice) / LAMPORTS_PER_SOL}
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
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Confirm Transaction</DialogHeader>
                      <BuyMultiple
                        connection={connection}
                        payersAddress={publicKey}
                        recieversAddress={inventory.user.walletAddress}
                        sendTransaction={sendTransaction}
                        balance={balance}
                        inventoryId={inventory.id}
                        inventoryImageUri={inventory?.inventoryImageUri!}
                        inventoryName={inventory?.inventoryName!}
                        session={session}
                        transactionAmount={totalPrice}
                        selectedSlots={selectedSlots}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </DialogFooter>
            </>
          </DialogContent>
        </Dialog>
      }
      cards={
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start p-3">
          {inventory?.adSlots.length === 0
            ? "This inventory has not ad slots listed."
            : inventory?.adSlots.map((adSlot) => {
                const rented = Boolean(
                  slotsArray.find(
                    (slot) => slot.id == adSlot.id && slot.isRented
                  )
                );
                const selected = Boolean(
                  slotsArray.find(
                    (slot) => slot.id == adSlot.id && slot.isSelected
                  )
                );

                const walletAddress = adSlot.owner?.walletAddress;
                const wa =
                  walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4);
                return (
                  <Card
                    onClick={() => {
                      if (rented) {
                        return;
                      }
                      handleClick(adSlot.id);
                    }}
                    disabled={rented}
                    className={`rounded-lg hover:shadow-[0_0_2rem_-0.5rem_#3178c6] cursor-pointer ${
                      selected &&
                      !rented &&
                      "shadow-[0_0_2rem_-0.5rem_#3178c6] border-blue-600"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="aspect-video overflow-hidden ">
                        <img
                          alt="Collection Image"
                          className="object-cover rounded-lg"
                          height="225"
                          src={adSlot.slotImageUri!}
                          style={{
                            aspectRatio: "400/225",
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
                          </div>
                          <div className="text-xs flex flex-col gap-1">
                            <p className="leading-none flex text-base pb-0.5 justify-between gap-2">
                              <span className="text-green-400 font-semibold">
                                Floor Price
                              </span>
                              <span className="flex items-center gap-1">
                                {Number(adSlot.slotPrice) / LAMPORTS_PER_SOL}{" "}
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
                            </p>
                            <p className=" leading-none flex justify-between gap-2">
                              <span className="text-muted-foreground font-medium">
                                Slot Area
                              </span>
                              <span>{`${adSlot.slotWidth} x ${adSlot.slotLength} `}</span>
                            </p>
                            <p className=" leading-none flex justify-between gap-2">
                              <span className="text-muted-foreground font-medium">
                                Ad Space Type
                              </span>
                              <span>{adSlot.slotType}</span>
                            </p>
                            <p className=" leading-none flex justify-between gap-2">
                              <span className="text-muted-foreground font-medium">
                                Platform
                              </span>
                              <span>{adSlot.slotPlatform}</span>
                            </p>
                            {rented && walletAddress ? (
                              <p className=" leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Owner
                                </span>
                                <span>{wa}</span>
                              </p>
                            ) : (
                              <p className=" leading-none flex justify-between gap-2">
                                <span className="text-muted-foreground font-medium">
                                  Available
                                </span>
                                <span>Yes</span>
                              </p>
                            )}
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
