import { getEntries } from "@/lib/actions/entry.actions";
import Entry from "./Entry";
import { auth } from "@clerk/nextjs";

const EntryList = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const entries = await getEntries(userId);
  const totalCalories = entries?.reduce(
    (acc, entry) => acc + entry.calories,
    0
  );

  return (
    <>
      {entries && entries.length > 0 && (
        <>
          <div className="border rounded-b-lg w-full flex flex-col divide-y">
            {entries.map((entry) => (
              <Entry
                key={entry._id}
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
export default EntryList;
