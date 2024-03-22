"use server";

import Meal, { IMeal } from "@/database/models/meal.schema";
import { connectToDatabase } from "@/database/mongoose";

// create a meal entry
export async function createMeal(userId: string, formData: FormData) {
  try {
    await connectToDatabase();

    const newMeal = Meal.create({
      authorClerkId: userId,
      name: formData.get("name") as string,
    });
  } catch (error) {
    throw new Error(String(error));
  }
}

// get todays meals
export async function getTodaysMeals(clerkId: string) {
  try {
    await connectToDatabase();

    const meals = await Meal.find({
      authorClerkId: clerkId,
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    });

    return meals;
  } catch (error) {
    throw new Error(String(error));
  }
}
