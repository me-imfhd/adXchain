import InventoryCard from "@/components/layout/InventoryCard";
import { api } from "@repo/trpc";
import Link from "next/link";
// import { useRouter } from "next/router";


export default async function AllInventories(){
    const inventory = await api.inventory.getAllInventories.query();
    console.log("inventories ", inventory)
    // const router = useRouter();
    return (
        <div className="flex flex-wrap gap-4 items-center">
            {inventory.map((inventory) => {
        return <div>
            
           <InventoryCard imgURL={inventory.inventoryImageUri!} CollectionName={inventory.inventoryName} CollectionPlatform={inventory.inventoryPlatform!} CollectionWebsite={inventory.inventoryWebsiteUri!} Collectionid={inventory.id}/>
        </div>;
      })}
        </div>
    )
}