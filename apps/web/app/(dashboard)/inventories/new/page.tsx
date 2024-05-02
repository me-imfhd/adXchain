import React from "react";
import Inventory from "../../_components/inventory";
import { checkAuth } from "@repo/auth";

export default async function AddInventoryPage() {
  const session = await checkAuth();
  return <Inventory session={session} />;
}
