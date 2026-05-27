import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { email, password } = await req.json();

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password)));

  if (user) {
    return Response.json({ message: "Login Successful", username: user.username });
  }

  return Response.json({ message: "Invalid Credentials" });
};

export const config: Config = {
  path: ["/api/login", "/api/login/"],
};
