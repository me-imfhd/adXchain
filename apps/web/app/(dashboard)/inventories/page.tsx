import React from "react";
import InventoriesPage from "../_components/inventories-page";
import { getWalletsInventory } from "@repo/api";
import { checkAuth } from "@repo/auth";

export default async function InventoryPage() {
  const session = await checkAuth();
  const inventories = await getWalletsInventory(session.user.id);
  return <InventoriesPage inventories={inventories} />;
}
