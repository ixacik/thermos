"use client";

import { getMealType } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { createEntry } from "@/lib/actions/entry.actions";
import { useRouter } from "next/navigation";
import { getMacros } from "@/lib/actions/chatgpt.actions";

const InputField = ({ clerkId }: { clerkId: string }) => {
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const submit = async () => {
    const macros = await getMacros(name);
    if (!macros) return console.log("Error fetching macros from openai.");

    const parsedMacros = JSON.parse(macros);

    await createEntry({
      path: "/",
      name: parsedMacros.shortenedName,
      clerkId,
      ...parsedMacros,
    });
    setName("");
  };

  return (
    <div className="relative h-14 flex w-full">
      <Input
        className="absolute inset-0"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={`What did you eat for ${getMealType()}?`}
      />
      <Button
        type="submit"
        className="absolute right-0 top-0 bottom-0 rounded-l-none"
        onClick={submit}
      >
        Add to journal
      </Button>
    </div>
  );
};
export default InputField;
