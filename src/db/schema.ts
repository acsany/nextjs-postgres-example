import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const messageTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
});
