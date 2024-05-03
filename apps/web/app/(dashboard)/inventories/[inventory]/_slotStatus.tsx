"use client";
import { catchError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateNftBodyParams } from "@repo/api/types";
import { trpc } from "@repo/trpc/trpc/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TypographyH3,
} from "@repo/ui/components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const updatePrice = z.object({
  status: z.enum(["active", "inactive"]),
});
export default function UpdateStatus({
  inventoryId,
  nftId,
  nftBody,
}: {
  inventoryId: number;
  nftId: number;
  nftBody: UpdateNftBodyParams;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutateAsync: updateUnderdogNFT } =
    trpc.underdog.updateUnderdogNFT.useMutation();
  const form = useForm<z.infer<typeof updatePrice>>({
    resolver: zodResolver(updatePrice),
    defaultValues: {
      status: nftBody.attributes.status,
    },
  });
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full relative hover:bg-secondary flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Update Status
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <TypographyH3>Update Ad Status</TypographyH3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              setIsLoading(true);

              try {
                const underdogApiEndpoint =
                  "https://devnet.underdogprotocol.com";
                await updateUnderdogNFT({
                  nftId,
                  projectId: inventoryId,
                  nftBody: {
                    name: nftBody.name,
                    image: nftBody.image,
                    description: nftBody.description,
                    attributes: { ...nftBody.attributes, status: data.status },
                  },
                  underdogApiEndpoint,
                });
                router.refresh();
                toast.success("Ad NFT's Status Updated");
                toast.info(
                  "Metadata updates will occur once validated on-chain, it can take upto several hours."
                );

                setIsLoading(false);
              } catch (err) {
                catchError(err);
                setIsLoading(false);
                return;
              }
            })}
          >
            <div className="pb-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
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
