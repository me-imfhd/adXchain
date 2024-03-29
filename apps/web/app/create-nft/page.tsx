import Trade from "@/components/landing-page/Trade";
import {CreateNFTForm} from "@/components/layout/CreateNFTForm";
import React from "react";

export default function CreateNFTPage() {
  return (
    <div
      className="flex flex-col items-center justify-center mt-16  w-full"
    >
      <CreateNFTForm />
    </div>
  );
}
