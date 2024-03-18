import React from "react";
import { Button, ButtonProps } from "../button";
import { cn } from "../../cn";
import clsx from "clsx";

export function ZoomingButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        className,
        "group relative mx-8 w-fit overflow-hidden rounded-xl bg-gradient-to-bl from-red-400 to-slate-700 p-[2px] font-bold transition-all duration-300 hover:rounded-2xl active:rounded-xl active:duration-150 sm:mx-16 md:mx-auto md:mr-0 md:mt-16 md:-translate-x-[25%] md:scale-[1.5] md:hover:scale-[1.6] md:active:scale-[1.5] lg:mr-auto lg:translate-x-0"
      )}
    >
      <span className="inline-flex h-full w-fit items-center gap-1 rounded-[10px] bg-white/90 px-4 py-2 text-black transition-all duration-300 group-hover:rounded-2xl group-hover:bg-white/0 group-hover:text-white dark:bg-black/80 dark:text-white group-hover:dark:bg-black/0 dark:group-hover:text-black">
        {children}
      </span>
    </Button>
  );
}
