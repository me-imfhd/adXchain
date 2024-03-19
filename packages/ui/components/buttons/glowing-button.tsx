import React from "react";
import { Button, ButtonProps } from "../button";
import { cn } from "../../cn";

export function GlowingButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <div className="mx-auto rounded-md duration-300 hover:shadow-[0_0_2rem_-0.5rem_#3178c6]">
      <Button
        {...props}
        className={cn(
          className,
          "fancy-border-gradient hover:bg-background relative mx-auto flex gap-4 border-none font-semibold hover:-translate-y-[1px] active:translate-y-[1px] "
        )}
        variant="outline"
      >
        {children}
      </Button>
    </div>
  );
}
