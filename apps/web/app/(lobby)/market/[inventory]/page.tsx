import { api } from "@repo/trpc";
import { notFound } from "next/navigation";
import React from "react";
import MarketPage from "../../_components/market-page";
export default async function InventoryPage({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const i = await api.inventory.getInventoryById.query({ id: inventory });
  if (!i) {
    notFound();
  }
  const { lent, total } = await api.adSlots.getSlotCountInInventory.query({
    id: inventory,
  });
  return (
    <MarketPage inventory={i} lent={lent} total={total}/>
  );
}
