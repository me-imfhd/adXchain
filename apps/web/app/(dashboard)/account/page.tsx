import { getUserAuth } from "@repo/auth";
import UserSettings from "../_components/UserSettings";

export default async function AccountPage() {
  const session = await getUserAuth();
  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
