import EditInventory from "@/app/(dashboard)/_components/editInventory";
import { getInventory } from "@repo/api";
import { checkAuth } from "@repo/auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params: { inventory },
}: {
  params: { inventory: number };
}) {
  await checkAuth();
  const res = await getInventory(inventory);
  console.log(inventory);
  if (!res) {
    notFound();
  }
  return <EditInventory inventory={res} inventoryId={Number(inventory)} />;
}
