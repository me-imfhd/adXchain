import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Oxanium,
} from "next/font/google";
import localFont from "next/font/local";

export const oxCustom = localFont({
  src: [{ path: "./font/static/Oxanium-Regular.ttf", weight: "400" }],
  variable: "--font-ox",
});
export const oxSemiBold = localFont({
  src: [{ path: "./font/static/Oxanium-SemiBold.ttf" }],
  variable: "--font-ox-semi-bold",
});
export const pressStart = localFont({
  src: [{ path: "./font/PressStart2P-Regular.ttf", weight: "400" }],
  variable: "--font-psp2",
});
