import { GlowingButton } from "@repo/ui/components/buttons";
import Link from "next/link";
import React from "react";

export function Hero() {
  return (
    <div className="text-center flex flex-col justify-between items-center">
      <div className="mx-auto w-full text-center inline-block bg-clip-text">
        <h1 className=" lg:mt-8 flex justify-center w-full  items-center h-[5rem] md:h-[5rem] lg:h-[16rem]  sm:text-[5rem] lg:text-[90px] xl:text-[128px] text-[2.2rem]">
          <span>ad</span>
          <span>X</span>
          <span>Chain</span>
        </h1>
      </div>
      <div className="relative inline-flex before:absolute before:inset-0">
        <Link
          className="px-3 py-1 text-sm font-medium inline-flex items-center justify-center border border-transparent rounded-full  text-zinc-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.primary.900),_theme(colors.primary.900))_padding-box,_conic-gradient(theme(colors.primary.400),_theme(colors.primary.700)_25%,_theme(colors.primary.700)_75%,_theme(colors.primary.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-zinc-800/30 before:rounded-full before:pointer-events-none"
          href="https://github.com/adXchain"
          target="_blank"
        >
          <span className="relative inline-flex items-center">
            A solana based market place for ad-spaces{" "}
            <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              &gt;
            </span>
          </span>
        </Link>
      </div>
      <h2 className="md:pt-2 mt-4 xs:max-w-xs sm:w-fit lg:pb-2 tracking-wide md:tracking-normal text-center animate-fade-up text-3xl font-bold  text-black dark:text-white sm:text-[37px]">
        Future Of Web3 Advertising is Here!
      </h2>
      <div className="pt-6 flex justify-center items-center gap-5 animate-fade-up">
        <Link href="/inventories">
          <GlowingButton animationType="up" tap="in">
            Launch your Project
          </GlowingButton>
        </Link>
        {/* <Button
          size="sm"
          className="rounded-lg hover:bg-background duration-300 hover:shadow-[0_0_2rem_-0.5rem_#3178c6]"
          variant="ghost"
          animationType="none"
          tap="in"
        >
          Learn More
        </Button> */}
      </div>
    </div>
  );
}
