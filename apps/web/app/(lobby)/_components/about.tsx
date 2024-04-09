import { PageHeader } from "@/components/page-header";
import React from "react";
import laptop from "@/public/images/laptop.png";
import Image from "next/image";

export function About() {
  return (
    <div className=" w-full flex justify-center items-center text-center mt-10">
      <div className="w-full flex flex-col justify-center items-center text-center">
        <div className="mt-5 relative hidden md:block">
          <div className="relative">
            <Image src={laptop} alt="laptop" height={900} width={900} />
            <div className="absolute top-9 left-32">
              <iframe
                width="635"
                height="420"
                src="https://www.youtube.com/embed/7O79afv8mUA?si=gy9RM4C-GdcbeM2_"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
