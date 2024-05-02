"use client";
import { s3Upload, updateUnderdogNFT } from "@repo/api";
import { UpdateNftBodyParams } from "@repo/api/types";
import { trpc } from "@repo/trpc/trpc/client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/webm",
  "video/mp4",
];
export default function UpdateAd({
  inventoryId,
  nftId,
  nftBody,
  adImage,
}: {
  inventoryId: number;
  nftId: number;
  nftBody: UpdateNftBodyParams;
  adImage: string | null | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { mutateAsync } = trpc.underdog.updateUnderdogNFT.useMutation();
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full relative hover:bg-secondary flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Update Status
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!image) {
              throw new Error("File Not Found");
            }
            if (!ACCEPTED_IMAGE_MIME_TYPES.includes(image.type)) {
              throw new Error("Format not supported");
            }
            if (!(image.size <= MAX_FILE_SIZE)) {
              throw new Error("Max image size is 5mb.");
            }
            setIsLoading(true);
            console.log(image.size);
            const s3ImageUri = await s3Upload(image);
            console.log(s3ImageUri);
            try {
              const underdogApiEndpoint = "https://devnet.underdogprotocol.com";
              await mutateAsync({
                nftId,
                projectId: inventoryId,
                nftBody: {
                  name: nftBody.name,
                  image: nftBody.image,
                  description: nftBody.description,
                  attributes: {
                    ...nftBody.attributes,
                    displayUri: s3ImageUri,
                    fileType: image.type,
                  },
                },
                underdogApiEndpoint,
              });
              router.refresh();
              toast("Your ad is updated successfully.");
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              toast("INTERNAL_SERVER_ERROR", {
                description:
                  (err as Error).message ?? "Check console for errors",
              });
              setIsLoading(false);
              return;
            }
          }}
        >
          <Card className="overflow-hidden border-0">
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
                  ) : adImage && adImage.length > 5 ? (
                    <img
                      src={adImage}
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm">
                        <span className="font-semibold">Click to upload</span>{" "}
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
          <Button
            className="w-fit"
            isLoading={isLoading}
            type="submit"
            disabled={isLoading || !image}
            animationType="none"
          >
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
