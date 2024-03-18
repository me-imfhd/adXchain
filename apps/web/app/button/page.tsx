import React from "react";
import {
  ActionButton,
  GlowingButton,
  ZoomingButton,
} from "@repo/ui/components/buttons";
import { Button } from "@repo/ui/components";
export default function Page() {
  return (
    <div className="flex mt-10 flex-col gap-10 items-center justify-between ">
      <ActionButton animationType="left">Action Button</ActionButton>
      <GlowingButton>Glowing Button</GlowingButton>
      <ZoomingButton animationType="none">Multi Feature</ZoomingButton>
      <Button tap="in">Tap Me</Button>
    </div>
  );
}
