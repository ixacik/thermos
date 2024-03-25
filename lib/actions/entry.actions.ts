"use server";

import { Entry } from "@/db/models/entry.model";
import { connectToDatabase } from "@/db/mongoose";
import { revalidatePath } from "next/cache";

interface CreateEntryProps {
  path: string;
  name: string;
  clerkId: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export async function createEntry({
  path,
  name,
  clerkId,
  calories,
  protein,
  carbs,
  fat,
}: CreateEntryProps) {
  try {
    await connectToDatabase();

    const newEntryDocument = await Entry.create({
      name,
      clerkId,
      calories,
      protein,
      carbs,
      fat,
    });
    const newEntry = newEntryDocument.toObject();

    revalidatePath(path);

    return newEntry;
  } catch (error) {
    console.log(error);
  }
}

export async function getEntries(clerkId: string) {
  try {
    await connectToDatabase();

    const entriesDocuments = await Entry.find({ clerkId });
    const entries = entriesDocuments.map((entry) => entry.toObject());

    return entries;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEntry(_id: string) {
  try {
    await connectToDatabase();

    await Entry.deleteOne({ _id });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
