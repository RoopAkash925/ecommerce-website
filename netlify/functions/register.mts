import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { username, email, password } = await req.json();

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return Response.json({ message: "User already exists" });
  }

  await db.insert(users).values({ username, email, password });
  return Response.json({ message: "Registration Successful" });
};

export const config: Config = {
  path: ["/api/register", "/api/register/"],
};
