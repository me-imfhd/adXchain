import { Session } from "@repo/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@repo/ui/components";
import Image from "next/image";
import React from "react";

export default function Profile({ session: { user } }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full  "
        >
          <img
            src={
              "https://i.pinimg.com/originals/d6/d0/bd/d6d0bdfdbdb9db439b8033c7681976dc.jpg"
            }
            className="object-cover"
            alt="P"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-muted-foreground">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
