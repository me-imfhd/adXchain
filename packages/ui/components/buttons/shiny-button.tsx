import React from "react";
import { Button, ButtonProps } from "../button";
import { cn } from "../../cn";
import { buttonVariants } from "../button-variants";

export function ShinyButton({
  children,
  animationType,
  size,
  tap,
  variant,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <Button
      asChild
      {...props}
      className={cn(
        buttonVariants({ animationType, className, size, tap, variant }),
        "hero-join-button-dark rounded-[11px]  relative overflow-hidden  py-[3px] px-[2px] font-bold transition-all duration-300 hover:shadow-[0_0_2rem_-0.5rem_#fff8] ",
      )}
      size="lg"
      variant="outline"
    >
      <span className="text-foreground text-md rounded-lg px-[12px] py-[7px] transition-all duration-300 bg-background ">
        {children}
      </span>
    </Button>
  );
}
