"use client";
import { Boxes } from "@/components/landing-page/Background";
import HeroSection from "@/components/landing-page/hero-section";
import { CardBody, CardContainer, CardItem } from "@/components/layout/3dCard";
import { WavyBackground } from "@/components/layout/WavyBackrgound";
import logo from "@/public/images/adXchain-logo.png";
import { Button } from "@repo/ui/components";
import Image from "next/image";

export default function IndexPage() {
  return (
    <div>
      <HeroSection />
      
      {/* <div className="h-[40rem] flex items-center justify-center w-full">
        <WavyBackground>
          <div className="w-full flex flex-wrap items-center  justify-between">
            <div>
              <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var">
              Future of <span className="gradient-text"> Web3 Advertising is Near</span>
              </p>

              <p className="text-base md:text-lg mt-4 text-white font-normal inter-var ">
              Connect with your audience through our NFT-powered ad spaces and seamless UPI-like transactions
              </p>
              <Button variant="default" className="mt-4">
                {" "}
                <span className="text-xl">Start Trading</span>
              </Button>
            </div>
            <div className=" flex flex-col items-center justify-center rounded-lg">
              <Image src={logo} alt="dsajf" height={500} width={500} />
            </div>
          </div>
        </WavyBackground>
      </div> */}
      <div className="min-h-screen relative w-full overflow-hidden bg-black flex flex-col rounded-lg">
        <Boxes />
        <div className="flex flex-wrap items-center justify-evenly">
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
          <CardContainerWrapper
            name="madlads"
            imgURL="https://www.madlads.com/mad_lads_logo.svg"
          />
        </div>
      </div>
    </div>
  );
}

interface CardContainerWrapperProps {
  name: string;
  imgURL: string;
}

const CardContainerWrapper = ({ imgURL, name }: CardContainerWrapperProps) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-5 border  ">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-neutral-600 dark:text-white"
        >
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={imgURL}
            height="1000"
            width="1000"
            className="h-52 w-full object-contain rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
