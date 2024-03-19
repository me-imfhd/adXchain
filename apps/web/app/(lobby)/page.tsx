import { Boxes } from "@/components/landing-page/Background";
import HeroSection from "@/components/landing-page/hero-section";
import { CardBody, CardContainer, CardItem } from "@/components/layout/3dCard";
import { Button, Shell } from "@repo/ui/components";
import {
  ActionButton,
  GlowingButton,
  ShinyButton,
  ZoomingButton,
} from "@repo/ui/components/buttons";

export default function IndexPage() {
  return (
    <div>
      <Shell
        variant={"markdown"}
        className="flex flex-col items-center select-none max-w-screen-lg"
      >
        <div className="relative  mx-auto w-full text-center animate-fade-up ">
          <div className="absolute left-0 top-0 -z-10 hidden h-full w-full transform-gpu bg-gradient-to-r from-red-500 via-red-600 to-green-500 opacity-70 blur-[58px] dark:block sm:opacity-35" />
          <h1 className=" lg:mt-8 text-4xl flex justify-center animate-gradient text-transparent gradient-text items-center gap-4 h-[4rem] md:h-[14rem] font-bold tracking-tighter sm:text-[12rem] md:text-[9rem] text-[4rem]">
            <span>Ad</span>
            <span className="sm:text-[14rem]"> X</span>{" "}
            <span className="">Chain</span>
          </h1>
        </div>
        <h2 className="md:pt-2 mt-4  xs:max-w-xs sm:w-max tracking-wide text-center animate-fade-up text-3xl font-bold md:tracking-tighter text-black dark:text-white sm:text-5xl">
          Future Of Web3 <span className="text-red-600/90">Advertising</span> is
          Here!
        </h2>
        <p className="animate-fade-up max-w-xs tracking-wide md:tracking-tighter md:pt-4 mt-2 lg:pt-8 md:max-w-lg lg:max-w-xl text-center text-lg font-bold  text-white/80 md:text-xl lg:text-2xl">
          Connect with your audience through our NFT-powered ad spaces and
          seamless UPI-like transactions
        </p>
        <div className="pt-6 flex justify-center items-center gap-5 animate-fade-up">
          <ShinyButton animationType="up" tap="in">
            Buy Ad NFT
          </ShinyButton>
          <Button
            size="sm"
            className="rounded-lg hover:bg-background duration-300 hover:shadow-[0_0_2rem_-0.5rem_#3178c6]"
            variant="ghost"
            animationType="none"
            tap="in"
          >
            Learn More
          </Button>
        </div>
      </Shell>
    </div>
  );
}
