import { api } from "@repo/trpc";
import { notFound } from "next/navigation";
import React from "react";
import MarketPage from "../../_components/market-page";
import { checkAuth } from "@repo/auth";
export type SlotMap = {
  id: string;
  isSelected: boolean;
  price: bigint;
  isRented: boolean;
  imageUri: string;
  slotName: string;
};
export default async function InventoryPage({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const session = await checkAuth();
  const i = await api.inventory.getActiveInventoryById.query({ id: inventory });
  if (!i) {
    notFound();
  }
  const { lent, total } = await api.adSlots.getSlotCountInInventory.query({
    id: inventory,
  });
  const supply = total - lent;
  const percentage = (supply / total) * 100;
  const initial: SlotMap[] = i.adSlots.map((adSlot) => ({
    id: adSlot.id,
    isSelected: false,
    price: adSlot.slotPrice,
    isRented: adSlot.lent,
    imageUri: adSlot.slotImageUri,
    slotName: adSlot.slotName,
  }));
  const totalBuyablePrice = initial
    .filter((slot) => !slot.isRented)
    .reduce((acc, curr) => acc + curr.price, BigInt(0));

  return (
    <MarketPage
    totalBuyablePrice={totalBuyablePrice}
      initial={initial}
      total={total}
      supply={supply}
      percentage={percentage}
      inventory={i}
      session={session}
    />
  );
}
