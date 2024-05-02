import EditSlot from "@/app/(dashboard)/_components/editSlot";
import { getAdNFT } from "@repo/api";
import { checkAuth } from "@repo/auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params: { adSlot, inventory },
}: {
  params: { adSlot: number; inventory: number };
}) {
  const session = await checkAuth();
  const adNFT = await getAdNFT(inventory, adSlot);
  if (!adNFT) {
    notFound();
  }
  return (
    <EditSlot session={session} adNFT={adNFT} inventoryId={Number(inventory)} />
  );
}
