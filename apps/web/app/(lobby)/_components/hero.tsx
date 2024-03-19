import { Button } from "@repo/ui/components";
import { ShinyButton } from "@repo/ui/components/buttons";
export function Hero() {
  return (
    <div className="flex flex-col items-center select-none  pt-8 pb-16 ">
      <div className="h-full w-full absolute left-0 top-0 -z-10 hidden transform-gpu bg-gradient-to-r from-blue-500/60 via-zinc-800 to-red-500/70 opacity-45 blur-[54px] dark:block sm:opacity-35" />
      <div className="relative  mx-auto w-full text-center animate-fade-up ">
        <h1 className=" lg:mt-8 flex justify-center animate-gradient text-transparent gradient-text items-center gap-2 sm:gap-4 h-[5rem] md:h-[14rem] font-bold tracking-tighter sm:text-[12rem] md:text-[9rem] text-[4rem]">
          <span>Ad</span>
          <span className="text-[4.5rem] sm:text-[14rem]"> X</span>
          <span className="">Chain</span>
        </h1>
      </div>
      <h2 className="md:pt-2 mt-4 px-6 xs:max-w-xs sm:w-fit tracking-wide md:tracking-normal text-center animate-fade-up text-3xl font-bold  text-black dark:text-white sm:text-5xl">
        Future Of Web3 <span className="text-red-600/90">Advertising</span> is
        Here!
      </h2>
      <p className="animate-fade-up px-6 max-w-xs tracking-wide md:tracking-normal  mt-2 lg:pt-2 md:max-w-lg lg:max-w-2xl text-center text-lg font-bold  text-white/80 md:text-xl lg:text-2xl">
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
    </div>
  );
}
