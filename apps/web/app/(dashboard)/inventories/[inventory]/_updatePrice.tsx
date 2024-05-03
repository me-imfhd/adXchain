"use client";
import { useWalletSession } from "@/lib/hooks/check-wallet";
import { catchError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAdNFTAccount } from "@repo/api";
import { Session } from "@repo/auth";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  FormField,
  Input,
  Label,
  TypographyH3,
} from "@repo/ui/components";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const updatePrice = z.object({
  slotPrice: z.number(),
});
export default function UpdatePrice({
  inventoryId,
  adMint,
  nftId,
  lent,
  price_lamports,
  session,
}: {
  inventoryId: number;
  adMint: string;
  lent: boolean;
  nftId: number;
  price_lamports: number;
  session: Session;
}) {
  const { program } = useWalletSession(session);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof updatePrice>>({
    resolver: zodResolver(updatePrice),
    defaultValues: {
      slotPrice: price_lamports,
    },
  });
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full relative hover:bg-secondary text-red-500 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Update Price
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <TypographyH3>Update Ad Price</TypographyH3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              setIsLoading(true);
              if (data.slotPrice < 0) {
                throw new Error("Only Positive Numbers are allowed");
              }
              if (!program) {
                router.refresh();
                throw new Error("Please try again.");
              }
              try {
                const mint = adMint;
                const slotPrice = data.slotPrice * LAMPORTS_PER_SOL;
                await updateAdNFTAccount(
                  inventoryId,
                  nftId,
                  mint,
                  program,
                  slotPrice
                );
                router.refresh();
                toast.success("Ad NFT's Price Updated");
                setIsLoading(false);
              } catch (err) {
                catchError(err);
                setIsLoading(false);
                return;
              }
            })}
          >
            <div className="pb-3">
              <Label htmlFor="slotPrice">Slot Price ( in sol )</Label>
              <FormField
                control={form.control}
                name="slotPrice"
                render={({ field }) => (
                  <Input
                    type="number"
                    className="w-full pt-2"
                    {...field}
                    {...form.register("slotPrice", {
                      valueAsNumber: true,
                    })}
                    placeholder="3.97"
                  />
                )}
              />
            </div>
            <Button
              className="w-fit"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              animationType="none"
            >
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
