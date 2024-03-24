"use client";

import { deleteEntry } from "@/lib/actions/entry.actions";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface EntryProps {
  _id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const Entry = ({ _id, name, calories, protein, carbs, fat }: EntryProps) => {
  const router = useRouter();

  async function removeEntry() {
    await deleteEntry(_id);
    router.refresh();
  }

  return (
    <div className="w-full flex justify-between items-center px-8 py-4">
      <h1 className="text-lg text-accent-foreground">{name}</h1>
      <div className="flex items-center gap-2 text-muted-foreground">
        <p className="text-foreground">{calories} Kcal</p>
        <p>{protein}P</p>
        <p>{carbs}C</p>
        <p>{fat}F</p>
        <X
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={removeEntry}
        />
      </div>
    </div>
  );
};
export default Entry;
