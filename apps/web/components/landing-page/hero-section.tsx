"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "../layout/RevealCard";
import { ImagesSlider } from "./ImageSlider";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../layout/3dCard";
import Image from "next/image";

const HeroSection = () => {

  const images = [
    "https://ideogram.ai/api/images/direct/n4Pmr5_XRVWxu9TqZkzQJw.png",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://ideogram.ai/api/images/direct/yMKGFi8vSOy9WEWZGrrhDA.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center  h-[30rem] rounded-2xl w-full">
        <ImagesSlider className="h-[30rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        <TextRevealCard
      text="You know what adXchain is?"
      revealText="Leading NFT Marketplace"
    >
    </TextRevealCard>
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Start Trading →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
    
  </div>
  );
};

export default HeroSection;
