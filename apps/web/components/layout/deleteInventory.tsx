"use client";
import { AdSlotId } from "@repo/db";
import { trpc } from "@repo/trpc/trpc/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  TypographyH3,
} from "@repo/ui/components";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteInventory({
  id,
  children,
}: {
  id: AdSlotId;
  children: React.ReactNode;
}) {
  const { isLoading, mutateAsync } =
    trpc.inventory.deleteInventory.useMutation();
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <TypographyH3>Delete Inventory</TypographyH3>
        <Button
          className="w-full"
          variant="destructive"
          isLoading={isLoading}
          disabled={isLoading}
          animationType="none"
          onClick={async () => {
            await mutateAsync({ id });
            router.refresh();
          }}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
