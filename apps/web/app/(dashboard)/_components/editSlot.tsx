"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@repo/ui/components";
import { ChevronLeft } from "@repo/ui/icons";
import { trpc } from "@repo/trpc/trpc/client";
import { useForm } from "react-hook-form";
import { editAdSlotForm } from "@repo/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { s3Upload } from "./s3Upload";
import { useRouter } from "next/navigation";
import { GetAdSlotById } from "@repo/api";
import { deleteS3Image } from "./s3Delete";
import Link from "next/link";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
export default function EditSlot({ slot }: { slot: GetAdSlotById }) {
  const updateAdSlot = trpc.adSlots.updateAdSlot.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const slotPrice = Number(slot?.slotPrice) / LAMPORTS_PER_SOL;
  const form = useForm<z.infer<typeof editAdSlotForm>>({
    resolver: zodResolver(editAdSlotForm),
    defaultValues: { ...slot, slotPrice },
  });
  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLoading(true);
            try {
              if (data.slotPrice < 0) {
                throw new Error("Only Positive Numbers are allowed");
              }
              if (data.slotWidth && data.slotLength) {
                if (data.slotWidth < 0 || data.slotLength < 0) {
                  throw new Error("Only Positive Numbers are allowed");
                }
              }
              const slotPrice = BigInt(data.slotPrice * LAMPORTS_PER_SOL);
              if (!image) {
                const res = await updateAdSlot.mutateAsync({
                  ...data,
                  slotPrice,
                  updatedAt: new Date(),
                });
                if (res) {
                  toast("Ad slot updated successfully.");
                  router.push(`/inventories/${slot?.inventoryId}`);
                  router.refresh();
                  setIsLoading(false);
                }
                return;
              }
              const s3ImageUri = await s3Upload(image);
              const res = await updateAdSlot.mutateAsync({
                ...data,
                slotPrice,
                updatedAt: new Date(),
                slotImageUri: s3ImageUri,
              });
              if (!res) {
                await deleteS3Image(s3ImageUri);
                return;
              }
              toast("Ad slot updated successfully.");
              router.push(`/inventories/${slot?.inventoryId}`);
              router.refresh();
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              toast("INTERNAL_SERVER_ERROR", {
                description:
                  (err as Error).message ?? "Check console for errors",
              });
              setIsLoading(false);
            }
          })}
        >
          <div className="flex items-center gap-4">
            <Link href={`/inventories/${slot?.inventoryId}`}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Update Ad Slot
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 pt-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ad slot Details</CardTitle>
                  <CardDescription>
                    Fill details about your ad slot.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <FormField
                        name="slotName"
                        control={form.control}
                        render={({ field }) => (
                          <Input type="text" className="w-full" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <FormField
                        name="slotDescription"
                        control={form.control}
                        render={({ field }) => (
                          <Textarea className="min-h-32" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Website URI</Label>
                      <FormField
                        name="slotWebsiteUri"
                        control={form.control}
                        render={({ field }) => (
                          <Input type="text" className="w-full" {...field} />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>More Details</CardTitle>
                  <CardDescription>
                    Estimated lenght width of your ad space on 100% zoom and
                    price of your slot.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="slotPrice">Slot Price ( in sol )</Label>
                      <FormField
                        control={form.control}
                        name="slotPrice"
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                            {...form.register("slotPrice", {
                              valueAsNumber: true,
                            })}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="slotWidth">Slot Width</Label>

                      <FormField
                        control={form.control}
                        name="slotWidth"
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                            {...form.register("slotWidth", {
                              valueAsNumber: true,
                            })}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="slotLength">Slot Length</Label>
                      <FormField
                        control={form.control}
                        name="slotLength"
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            {...field}
                            {...form.register("slotLength", {
                              valueAsNumber: true,
                            })}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="platform">Platform</Label>

                      <FormField
                        control={form.control}
                        name="slotPlatform"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Mobile App">
                                  Mobile App
                                </SelectItem>
                                <SelectItem value="Web App">Web App</SelectItem>
                                <SelectItem value="Billboard">
                                  Billboard
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Space Type</CardTitle>
                  <CardDescription>
                    Select the type of ad space are your listing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="slotType"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select Ad Space"
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Banner Ad">Banner Ad</SelectItem>
                            <SelectItem value="Pop Up Ad">Pop Up Ad</SelectItem>
                            <SelectItem value="Aside Ad">Aside Ad</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Ad Inventory Image</CardTitle>
                  <CardDescription>
                    Upload Image for your ad inventory.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer px-2"
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(new Blob([image]))}
                          alt={"NFTImage"}
                          height={200}
                          width={200}
                        />
                      ) : (
                        <img
                          src={slot?.slotImageUri!}
                          alt={"NFTImage"}
                          height={200}
                          width={200}
                        />
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setImage(e.target.files?.[0] || null);
                        }}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
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
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              size="sm"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
