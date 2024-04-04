import React from "react";
import NewSlot from "@/app/(dashboard)/_components/newSlot";
import { api } from "@repo/trpc";

export default async function AddNewAdNFTPage({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const i = await api.inventory.getInventoryById.query({
    id: inventory,
  });
  return <NewSlot inventory={i} />;
}
