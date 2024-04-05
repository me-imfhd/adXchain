import { api } from "@repo/trpc";
import { notFound } from "next/navigation";
import React from "react";
import MarketPage from "../../_components/market-page";
import { checkAuth } from "@repo/auth";

export default async function InventoryPage({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const session = await checkAuth();
  const i = await api.inventory.getInventoryById.query({ id: inventory });
  if (!i) {
    notFound();
  }
  const { lent, total } = await api.adSlots.getSlotCountInInventory.query({
    id: inventory,
  });
  const supply = total - lent;
  const percentage = (supply / total) * 100;
  return (
    <MarketPage
      lent={lent}
      total={total}
      supply={supply}
      percentage={percentage}
      inventory={i}
      session={session}
    />
  );
}
