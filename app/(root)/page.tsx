import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/utils";
import { UserButton, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IEntry } from "@/db/models/entry.model";
import EntryComponent from "@/components/shared/EntryComponent";
import { getEntries } from "@/lib/actions/entry.actions";

export default async function Home() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const entries = (await getEntries(userId)) as IEntry[];

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
        <EntryComponent entries={entries} clerkId={userId} />
      </div>
    </div>
  );
}
