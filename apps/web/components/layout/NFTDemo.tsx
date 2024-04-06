"use client";
import { cn } from "@repo/ui/cn";
import { Skeleton, buttonVariants } from "@repo/ui/components";
import React from "react";

interface NFTDemoProps {
  NFTImage: File | null;
}

const NFTDemo: React.FC<NFTDemoProps> = ({ NFTImage }) => {
  return (
    <div className="border-2 border-slate-500-500 flex flex-wrap justify-between p-5 mt-10 rounded-md">
      <div className="flex flex-wrap gap-4 items-center">
        {!NFTImage && (
          <Skeleton
            className={cn(
              buttonVariants({ size: "default" }),
              "w-[200px] h-[200px] md:w-[360px] md:h-[360px] bg-muted ",
            )}
          ></Skeleton>
        )}
        {NFTImage && (
          <img
            src={URL.createObjectURL(new Blob([NFTImage]))}
            alt={"NFTImage"}
            height={200}
            width={200}
          />
        )}
      </div>
    </div>
  );
};

export default NFTDemo;
