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
        "hero-join-button-dark rounded-xl  relative overflow-hidden  py-[2px] px-[1.5px] font-bold transition-all duration-300 hover:shadow-[0_0_2rem_-0.5rem_#fff8] "
      )}
      variant="outline"
    >
      <span className="text-foreground rounded-lg px-3 py-2 transition-all duration-300 bg-background ">
        {children}
      </span>
    </Button>
  );
}
