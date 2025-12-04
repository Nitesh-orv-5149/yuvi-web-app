import { db } from "@/lib/db";
import { queries, answers, categories } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const { category } = params;

    if (!category?.trim()) {
      return Response.json({ error: "category is required" }, { status: 400 });
    }

    // Validate category exists
    const exists = await db
      .select()
      .from(categories)
      .where(eq(categories.name, category));

    if (exists.length === 0) {
      return Response.json({ error: "Category does not exist" }, { status: 404 });
    }

    // Fetch queries under this category
    const rows = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.queryId, answers.queryId))
      .where(eq(queries.categoryId, category));

    return Response.json(rows, { status: 200 });

  } catch (err) {
    return Response.json(
      { error: "Failed to fetch category queries", details: err.message },
      { status: 500 }
    );
  }
}
