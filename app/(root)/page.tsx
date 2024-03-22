import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/utils";
import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <p>You are not signed in! Please sign in to continue.</p>
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="min-w-[650px] flex flex-col items-center justify-center">
        <div className="mb-6">
          <UserButton afterSignOutUrl="/" />
        </div>
        <h1 className="text-5xl mb-12">{`${getGreeting()}, ${
          user?.firstName || "Guest"
        }`}</h1>
        <InputField />
      </div>
    </div>
  );
}
