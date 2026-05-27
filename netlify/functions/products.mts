import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";

export default async (_req: Request) => {
  const allProducts = await db.select().from(products);
  return Response.json(allProducts);
};

export const config: Config = {
  path: ["/api/products", "/api/products/"],
  method: "GET",
};
