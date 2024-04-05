import { api } from "@repo/trpc";
import React from "react";
import InventoriesPage from "../_components/inventories-page";

export default async function InventoryPage() {
  const inventory = await api.inventory.getInventory.query();
  return <InventoriesPage inventory={inventory} />;
}
