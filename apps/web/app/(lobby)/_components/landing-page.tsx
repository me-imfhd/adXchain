import { Hero } from "./hero";
import { About } from "./about";
import FAQS from "@/components/landing-page/faqs";
import WhyUS from "./why-choose-us";
export function LandingPage() {
  return (
    <div className="bg-cover bg-center w-full max-w-[1250px] backdrop-filter flex flex-col items-center select-none pt-24 px-6 xl:px-0">
      <Hero />
      <About />
      <WhyUS />
      <FAQS />
    </div>
  );
}
