"use server";
import OpenAI from "openai";

export async function getMacros(meal: string) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Estimate calories and macros as best as you can for this meal ${meal}, your output HAS to be in the format of a JSON like this: {"shortenedName": (include a shorter name of the initial meal here. max a few words), "calories": xxx, "protein": xxx, "carbs": xxx, "fat": xxx}. Make sure it is a valid JSON. If not, retry.`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}
