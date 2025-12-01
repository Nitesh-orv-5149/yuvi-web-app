import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const { queryId } = params;

    if (!queryId?.trim()) {
      return Response.json({ error: "queryId is required" }, { status: 400 });
    }

    const rows = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.queryId, answers.queryId))
      .where(eq(queries.queryId, queryId));

    if (rows.length === 0) {
      return Response.json({ error: "Query not found" }, { status: 404 });
    }

    return Response.json(rows[0]);
  } catch (err) {
    return Response.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
