import EditInventory from "@/app/(dashboard)/_components/editInventory";
import { api } from "@repo/trpc";
import React from "react";

export default async function Page({
  params: { inventory },
}: {
  params: { inventory: string };
}) {
  const res = await api.inventory.getInventoryById.query({ id: inventory });
  return <EditInventory inventory={res} />;
}
