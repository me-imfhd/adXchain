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
  useToast,
} from "@repo/ui/components";
import { ChevronLeft } from "@repo/ui/icons";
import { trpc } from "@repo/trpc/trpc/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { s3Upload } from "./s3Upload";
import { useRouter } from "next/navigation";
import { insertAdSlotParams } from "@repo/db";
import { GetInventoryById } from "@repo/api";
import { deleteS3Image } from "./s3Delete";
import Link from "next/link";
export default function NewSlot({
  inventory,
}: {
  inventory: GetInventoryById;
}) {
  const createAdSlot = trpc.adSlots.createAdSlot.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof insertAdSlotParams>>({
    resolver: zodResolver(insertAdSlotParams),
    defaultValues: {
      inventoryId: inventory?.id,
      lent: false,
      mintAddress: null,
      ownerAddress: null,
      ownerEmail: null,
      status: "active",
      slotType: "Aside Ad",
      slotPlatform: "Web App",
    },
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
              if (!image) {
                throw new Error("Please upload image.");
              }
              const s3ImageUri = await s3Upload(image);
              const res = await createAdSlot.mutateAsync({
                ...data,
                slotImageUri: s3ImageUri,
                lent: false,
                mintAddress: null,
                ownerAddress: null,
                ownerEmail: null,
              });
              if (!res) {
                await deleteS3Image(s3ImageUri);
              }
              toast.toast({ title: "Ad slot created successfully." });
              router.push(`/inventories/${inventory?.id}`);
              router.refresh();
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              toast.toast({
                title: "Operation Failed",
                description:
                  (err as Error).message ?? "Check console for errors",
              });
              setIsLoading(false);
            }
          })}
        >
          <div className="flex items-center gap-4">
            <Link href={`/inventories/${inventory?.id}`}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Add New Ad Slot
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create
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
                          <Textarea
                            className="min-h-32"
                            {...field}
                            value={field.value ?? ""}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Website URI</Label>
                      <FormField
                        name="slotWebsiteUri"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            className="w-full"
                            {...field}
                            value={field.value ?? ""}
                          />
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
                      <Label htmlFor="slotWidth">Slot Width ( in % )</Label>

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
                            value={field.value ?? ""}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="slotLength">Slot Length ( in % )</Label>
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
                            value={field.value ?? ""}
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
                          defaultValue={field.value ?? "Aside Ad"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select Ad Space"
                                defaultValue="Aside Ad"
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
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                        </div>
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
                              defaultValue={field.value ?? "active"}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue
                                    placeholder="Select status"
                                    defaultValue="active"
                                  />
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
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
