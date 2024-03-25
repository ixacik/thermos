"use client";

import { useOptimistic } from "react";
import Entry from "./Entry";
import { IEntry } from "@/db/models/entry.model";
import InputField from "./InputField";

const EntryComponent = ({
  entries,
  clerkId,
}: {
  entries: IEntry[];
  clerkId: string;
}) => {
  const [optimisticEntries, setOptimisticEntries] = useOptimistic(
    entries,
    (state, newEntry: any) => {
      return [...state, newEntry];
    }
  );

  const totalCalories = entries?.reduce(
    (acc, entry) => acc + entry.calories,
    0
  );

  return (
    <>
      <InputField
        clerkId={clerkId}
        setOptimisticEntries={setOptimisticEntries}
      />
      {optimisticEntries && optimisticEntries.length > 0 && (
        <>
          <div className="border rounded-b-lg w-full flex flex-col divide-y">
            {optimisticEntries.map((entry) => (
              <Entry
                key={entry._id || entry.name}
                _id={entry._id}
                name={entry.name}
                calories={entry.calories}
                protein={entry.protein}
                carbs={entry.carbs}
                fat={entry.fat}
              />
            ))}
          </div>
          <div className="w-full flex justify-end p-4">
            <p className="text-sm">
              <span className="font-bold">{totalCalories}kcal</span> total
            </p>
          </div>
        </>
      )}
    </>
  );
};
export default EntryComponent;
