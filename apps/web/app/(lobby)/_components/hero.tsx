import { ShinyButton } from "@repo/ui/components/buttons";
import Link from "next/link";
import React from "react";

export function Hero() {
  return (
    <div className="text-center flex flex-col justify-between items-center">
      <div className="mx-auto w-full text-center animate-fade-up inline-block bg-clip-text bg-gradient-to-br from-[#CCE8FE] via-[#8489F5] to-[#B591E9] ">
        <h1 className=" lg:mt-8 font-psp2  flex justify-center w-full text-transparent   items-center gap-2 sm:gap-4 h-[5rem] md:h-[8rem] lg:h-[16rem] tracking-tighter sm:text-[5rem] lg:text-[90px] xl:text-[128px] text-[2.2rem]">
          <span className="">
            {/* <div className="h-[80%] w-full  -z-10 hidden transform-gpu bg-sky-400 opacity-45 blur-[54px] dark:block sm:opacity-20" /> */}
            ad
          </span>
          <span className="text-[4.5rem] md:text-[9rem] lg:text-[14rem] xl:text-[300px] -mr-10">
            X
          </span>
          <span className="">
            {/* <div className="h-[80%] w-full absolute left-0 top-0 -z-10 hidden transform-gpu   bg-sky-400 opacity-45 blur-[54px] dark:block sm:opacity-20" /> */}
            Chain
          </span>
        </h1>
      </div>
      <h2 className="md:pt-2 mt-4 xs:max-w-xs sm:w-fit lg:pb-2 tracking-wide md:tracking-normal text-center animate-fade-up text-3xl font-bold  text-black dark:text-white sm:text-[37px]">
        Future Of Web3 Advertising is Here!
      </h2>
      <p className="animate-fade-up lg:leading-[30px] max-w-[740px] tracking-wide md:tracking-normal  mt-2  text-center text-lg   text-muted-foreground md:text-xl lg:text-[24px]">
        Connect with your audience through our NFT-powered ad spaces and
        seamless UPI-like transactions
      </p>
      <div className="pt-6 flex justify-center items-center gap-5 animate-fade-up">
        <Link href="/trade">
        <ShinyButton animationType="up" tap="in">
          Get Started
        </ShinyButton>
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
