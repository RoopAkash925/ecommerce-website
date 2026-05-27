import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial().primaryKey(),
  name: text().notNull(),
  price: integer().notNull(),
  description: text().notNull(),
  image: text().notNull(),
});

export const users = pgTable("users", {
  id: serial().primaryKey(),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});
