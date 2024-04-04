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

export default function DeleteSlot({ id }: { id: AdSlotId }) {
  const { isLoading, mutateAsync } = trpc.adSlots.deleteAdSlot.useMutation();
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full relative hover:bg-secondary text-red-500 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Delete
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <TypographyH3>Delete Ad Slot</TypographyH3>
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
