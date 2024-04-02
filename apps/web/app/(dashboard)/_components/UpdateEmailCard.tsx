import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Button, Input } from "@repo/ui/components";

export default function UpdateEmailCard({ email }: { email: string }) {
  return (
    <AccountCard
      params={{
        header: "Your Email",
        description:
          "Please enter the email address you want to use with your account.",
      }}
    >
      <form onSubmit={() => {}}>
        <AccountCardBody>
          <Input defaultValue={email ?? ""} name="email" />
        </AccountCardBody>
        <AccountCardFooter description="We will email vou to verify the change.">
          <Button>Update Email</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
