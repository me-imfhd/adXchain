"use client";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components";
import { Copy } from "@repo/ui/icons";
import React, { useState } from "react";

export default function CopyButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      // Optionally, reset the copied state after a delay
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  }
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            disabled={copied}
            onClick={async () => {
              await handleCopy();
            }}
          >
            <Copy className="h-4 w-4"></Copy>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy Id</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
