"use client";
import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button, Input } from "@repo/ui/components";

export default function UpdateNameCard({ name }: { name: string }) {
  return (
    <AccountCard
      params={{
        header: "Your Name",
        description:
          "Please enter your full name, or a display name you are comfortable with.",
      }}
    >
      <form onSubmit={() => {}}>
        <AccountCardBody>
          <Input defaultValue={name ?? ""} name="name" />
        </AccountCardBody>
        <AccountCardFooter description="64 characters maximum">
          <Button>Update Name</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
