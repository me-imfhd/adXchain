import { notFound } from "next/navigation";
import React from "react";
import MarketPage from "../../_components/market-page";
import { checkAuth } from "@repo/auth";
import { getInventory } from "@repo/api";
import { AdNFTAttributes } from "@repo/api/types";
export type SlotMap = {
  id: number;
  isSelected: boolean;
  price: number;
  isRented: boolean;
  imageUri: string;
  slotName: string;
  description: string;
  attributes: AdNFTAttributes;
  mintAddress: string;
  file: File | null | undefined;
};
export default async function InventoryPage({
  params: { inventory },
}: {
  params: { inventory: number };
}) {
  const session = await checkAuth();
  const i = await getInventory(inventory);
  if (!i) {
    notFound();
  }
  const activeAds = i.adNFTs.filter((ad) => ad.attributes.status == "active");
  const notLent = activeAds.filter((ad) => ad.account.lent === false);
  const supply = notLent.length;
  const percentage = (supply / activeAds.length) * 100;
  const initial: SlotMap[] = activeAds.map((adSlot) => ({
    id: Number(adSlot.account.id),
    isSelected: false,
    price: Number(adSlot.account.priceLamports),
    isRented: adSlot.account.lent,
    imageUri: adSlot.image,
    slotName: adSlot.name,
    description: adSlot.description,
    attributes: adSlot.attributes,
    mintAddress: adSlot.account.nftMint.toBase58(),
    file: null,
  }));
  const totalBuyablePrice = initial
    .filter((slot) => !slot.isRented)
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <MarketPage
      totalBuyablePrice={totalBuyablePrice}
      initial={initial}
      total={activeAds.length}
      supply={supply}
      percentage={percentage}
      inventory={i}
      activeAds={activeAds}
      inventoryId={i.id.toNumber()}
      session={session}
    />
  );
}
