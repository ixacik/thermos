import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  clerkId: varchar("user", { length: 100 }).notNull(),
  name: text("name").notNull(),
  calories: integer("calories"),
  protein: integer("protein"),
  fat: integer("fat"),
  carbs: integer("carbs"),
});

export type Entry = typeof entries.$inferSelect;
