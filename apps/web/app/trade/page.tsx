import Trade from "@/components/landing-page/Trade";
import React from "react";

export default function TradePage(){
    return (
        <div
      style={{
        backgroundImage: "radial-gradient( #666, #444, #111111, #010101)",
      }}
      className="flex flex-col items-center justify-center  w-full"
    >
      <Trade/>
    </div>
    )
}