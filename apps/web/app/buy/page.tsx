import React from "react";
import BuyAdNFT from "./_buyAdNFT";
import { api } from "@repo/trpc";
import { checkAuth, getUserAuth } from "@repo/auth";
import { notFound } from "next/navigation";

export default async function Page() {
  const slot = await api.adSlots.getAdSlotById.query({
    id: "clulkzpbr0003ztrqffpvaxab",
  });
  if (!slot) {
    notFound();
  }
  const session = await checkAuth();

  return <BuyAdNFT slot={slot} session={session} />;
}
