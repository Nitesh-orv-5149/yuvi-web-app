import { db } from "@/lib/db";
import { queries, answers, categories } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const { category } = params;

    if (!category?.trim()) {
      return Response.json({ error: "Category is required" }, { status: 400 });
    }

    // Validate category exists
    const check = await db.select().from(categories).where(eq(categories.name, category));
    if (check.length === 0) {
      return Response.json({ error: "Category does not exist" }, { status: 404 });
    }

    const rows = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.queryId, answers.queryId))
      .where(eq(queries.categoryId, category));

    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
