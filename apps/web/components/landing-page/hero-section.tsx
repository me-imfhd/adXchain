"use client";
import React from "react";
import { ImagesSlider } from "./ImageSlider";
import { motion } from "framer-motion";
import { ActionButton } from "@repo/ui/components/buttons";

const HeroSection = () => {
  const images = [
    "https://ideogram.ai/api/images/direct/n4Pmr5_XRVWxu9TqZkzQJw.png",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://ideogram.ai/api/images/direct/yMKGFi8vSOy9WEWZGrrhDA.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center  rounded-2xl w-full">
      <ImagesSlider className="h-[40rem]" images={images} direction="down">
        <motion.div
          initial={{
            opacity: 1,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.1,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Future of Web3 Advertising is Here
          </motion.p>
          <ActionButton className="py-6 px-8 text-2xl ">
            Start Trading →
          </ActionButton>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default HeroSection;
