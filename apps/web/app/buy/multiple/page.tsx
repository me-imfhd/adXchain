import React from "react";
import { api } from "@repo/trpc";
import { checkAuth } from "@repo/auth";
import { notFound } from "next/navigation";
import BuyMultiple from "../_buyMultipleAdNFTs";

export default async function Page() {
  const inventory = await api.inventory.getInventoryById.query({
    id: "clulkc1wo0001ztrqw3l4gskm",
  });
  if (!inventory) {
    notFound();
  }
  const session = await checkAuth();
  const slots = inventory.adSlots;

  return (
    <BuyMultiple
      inventoryImageUri={inventory.inventoryImageUri!}
      inventoryName={inventory.inventoryName}
      slots={inventory.adSlots}
      session={session}
    />
  );
}
