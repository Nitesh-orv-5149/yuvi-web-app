import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const { category } = params;

    const rows = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.queryId, answers.queryId))
      .where(eq(queries.categoryId, category));

    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
