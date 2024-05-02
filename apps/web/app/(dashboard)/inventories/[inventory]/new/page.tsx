import React from "react";
import NewSlot from "@/app/(dashboard)/_components/newSlot";
import { notFound } from "next/navigation";
import { checkAuth } from "@repo/auth";
import { getInventory } from "@repo/api";

export default async function AddNewAdNFTPage({
  params: { inventory },
}: {
  params: { inventory: number };
}) {
  const session = await checkAuth();
  const i = await getInventory(inventory);
  if (!i) {
    notFound();
  }
  return <NewSlot session={session} inventoryId={Number(inventory)} />;
}
