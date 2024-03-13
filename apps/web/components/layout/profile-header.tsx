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
          Sign In
          <span className="sr-only">Sign In</span>
        </div>
      </Link>
    </>
  );
};
