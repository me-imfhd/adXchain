"use client";
import Link from "next/link";
import React, { useState } from "react";

const PeerlistBanner = () => {
  const [show, setShow] = useState(true);
  console.log(show);

  return (
    <div
      className={`${show ? "block" : "hidden"} bg-green-600 w-full h-10 flex items-center justify-center`}
    >
      <div className="relative inline-flex before:absolute before:inset-0">
        <Link
          className="px-3 py-1 text-xl inline-flex items-center justify-center border border-transparent rounded-full  text-white font-bold hover:text-white transition duration-150 ease-in-out w-full  relative before:absolute before:inset-0 before:rounded-full before:pointer-events-none"
          href="https://github.com/adXchain"
          target="_blank"
        >
          <span className="relative inline-flex animate-blink items-center hover:underline">
            Support us on Peerlist{" "}
          </span>
        </Link>
      </div>
      <button
        className="h-5 w-5 text-white cursor-pointer absolute right-4"
        onClick={() => setShow((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default PeerlistBanner;
