import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq } from "drizzle-orm";

// DELETE QUERY (ADMIN)
export async function DELETE(req, { params }) {
  try {
    const { queryId } = await params;
    console.log(queryId)

    if (!queryId?.trim()) {
      return Response.json({ error: "queryId required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(queries)
      .where(eq(queries.queryId, queryId));

    if (existing.length === 0) {
      return Response.json({ error: "Query not found" }, { status: 404 });
    }

    await db.delete(answers).where(eq(answers.queryId, queryId));

    await db.delete(queries).where(eq(queries.queryId, queryId));

    return Response.json(
      { message: "Query deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: "Failed to delete query", details: err.message },
      { status: 500 }
    );
  }
}
