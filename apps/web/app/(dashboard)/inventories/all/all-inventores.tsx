"use client";
import InventoryCard from "@/components/layout/InventoryCard";
import React, { useEffect, useState } from "react";

interface AllInventoriesProps {
  i: any;
}

const AllInventories = ({ i }: AllInventoriesProps) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryData = await i;
        setInventory(inventoryData);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {inventory.map((inventory: any) => {
        return (
          <div>
            <InventoryCard
              imgURL={inventory.inventoryImageUri!}
              CollectionName={inventory.inventoryName}
              CollectionWebsite={inventory.inventoryWebsiteUri!}
              Collectionid={inventory.id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllInventories;
