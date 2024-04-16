import React from "react";
import Image from "next/image";
import GlowTop from "@/public/glow-top.svg";

export function About() {
  return (
    <section>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6">
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
            <Image
              src={GlowTop}
              className="max-w-none"
              width={1404}
              height={658}
              alt="Features Illustration"
            />
          </div>
        </div>
        <div className="w-full pt-16 pb-12 md:pt-52 md:pb-20">
          <div className="w-full">
            <div className="w-full flex flex-col max-w-xl mx-auto md:max-w-none md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">
              <div
                className="w-full order-1 md:w-7/12 lg:w-1/2 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                <h3 className="w-full pb-3 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60">
                  About Us
                </h3>
                <p className="w-full mb-8 text-lg text-zinc-400">
                    adXchain transforms digital advertising by offering publishers an easy way to list ad spaces and keep the most revenue while giving advertisers direct ad space ownership and simple UPI-like transactions. This decentralized network streamlines buying, renting, selling, and bidding ads spaces, enhancing transparency and efficiency.
                </p>
              </div>
              <div
                className="w-full order-0 md:w-5/12 lg:w-1/2 md:order-none"
                data-aos="fade-up"
              >
                <div className="w-full relative hidden md:block">
                  <div className="w-full relative">
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
        </div>
      </div>
    </section>
  );
}
