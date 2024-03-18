"use client";

import { cn } from "../../cn";
import { Button, ButtonProps } from "../button";

export function ActionButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <Button
      className={cn(
        "shadcnoverridetransition select-none rounded-3xl bg-black text-white shadow-[0px_16px_6px_-16px_#ff4,4px_2px_4px_-2px_#f4f,-4px_2px_4px_-2px_#4f4] hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-[0px_16px_6px_-12px_#ff4,4px_6px_6px_-2px_#f4f,-4px_6px_6px_-2px_#4f4] active:translate-y-0 active:scale-[0.99] active:shadow-[0px_10px_3px_-16px_#ff4,8px_0px_2px_-2px_#f4f,-8px_0px_2px_-2px_#4f4] dark:bg-white dark:text-black dark:hover:bg-white dark:hover:brightness-125 dark:hover:saturate-150",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
