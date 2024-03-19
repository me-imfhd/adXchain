import { Boxes } from "@/components/landing-page/Background";
import HeroSection from "@/components/landing-page/hero-section";
import { CardBody, CardContainer, CardItem } from "@/components/layout/3dCard";
import { Button, Shell } from "@repo/ui/components";
import {
  ActionButton,
  GlowingButton,
  ZoomingButton,
} from "@repo/ui/components/buttons";

export default function IndexPage() {
  return (
    <div>
      <Shell
        variant={"markdown"}
        className="flex flex-col items-center select-none"
      >
        <div className="relative  mx-auto w-full text-center ">
          <div className="absolute left-0 top-0 -z-10 hidden h-full w-full transform-gpu bg-gradient-to-r from-red-500 via-red-600 to-green-500 opacity-70 blur-[58px] dark:block sm:opacity-35" />
          <h1 className="mb-10 mt-16 text-4xl flex justify-center animate-gradient gradient-text items-center gap-4 h-[14rem] font-bold tracking-tighter text-black dark:text-white sm:text-[12rem]">
            <span>Ad</span>
            <span className="sm:text-[14rem]"> X</span>{" "}
            <span className="">Chain</span>
          </h1>
        </div>
        <h2 className=" text-3xl font-bold tracking-tighter text-black dark:text-white sm:text-5xl">
          Future Of Web3 <span className="text-red-600/90">Advertising</span> is
          Here!
        </h2>
        <p className="pt-8 max-w-xl text-center text-lg font-bold tracking-tighter text-white/80 sm:text-2xl">
          Connect with your audience through our NFT-powered ad spaces and
          seamless UPI-like transactions
        </p>
        <div className="pt-6">
          <GlowingButton>Buy Ad NFT</GlowingButton>
        </div>
      </Shell>
    </div>
  );
}
