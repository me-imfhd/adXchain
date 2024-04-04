import EditSlot from "@/app/(dashboard)/_components/editSlot";
import { api } from "@repo/trpc";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params: { adSlot },
}: {
  params: { adSlot: string };
}) {
  const slot = await api.adSlots.getAdSlotById.query({ id: adSlot });
  if (!slot) {
    notFound();
  }
  return <EditSlot slot={slot} />;
}
