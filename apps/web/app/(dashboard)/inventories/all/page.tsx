import InventoryCard from "@/components/layout/InventoryCard";
import { api } from "@repo/trpc";
import Link from "next/link";
import AllInventories from "./all-inventores";

export default async function Page(){
    const inventory = await api.inventory.getAllInventories.query(); 

    return (
        <AllInventories i={inventory}/>
  );
}
