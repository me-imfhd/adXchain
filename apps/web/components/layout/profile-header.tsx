import React from "react";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/components";

export const ProfileHeader = async () => {
  return (
    <>
      <Link href={"/sign-in"}>
        <div
          className={buttonVariants({
            size: "sm",
          })}
        >
           Connect Wallet
          <span className="sr-only">Connect Wallet</span>
        </div>
      </Link>
    </>
  );
};
