import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/utils";
import { UserButton, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import EntryList from "@/components/shared/EntryList";
import { Suspense } from "react";
import EntrySkeleton from "@/components/shared/EntrySkeleton";

export default async function Home() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

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
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
        <h1 className="text-5xl mb-12">{`${getGreeting()}, ${
          user?.firstName || "Guest"
        }`}</h1>
        {userId ? (
          <InputField clerkId={userId} />
        ) : (
          <div>User is not logged in</div>
        )}
        <Suspense fallback={<EntrySkeleton />}>
          <EntryList />
        </Suspense>
      </div>
    </div>
  );
}
