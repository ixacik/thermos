import { Schema, models, model, Document } from "mongoose";

export interface IEntry extends Document {
  name: string;
  clerkId: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
}

const EntrySchema = new Schema({
  name: { type: String, required: true },
  clerkId: { type: String, required: true },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export const Entry = models.Entry || model("Entry", EntrySchema);
