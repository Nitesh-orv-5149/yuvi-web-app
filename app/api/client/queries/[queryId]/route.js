import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

// GET SPECIFIC QUERY (with Answer)
export async function GET(req, { params }) {
  try {
    const { queryId } = params;

    if (!queryId?.trim())
      return Response.json({ error: "queryId required" }, { status: 400 });

    const rows = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.queryId, answers.queryId))
      .where(eq(queries.queryId, queryId));

    if (rows.length === 0)
      return Response.json({ error: "Query not found" }, { status: 404 });

    return Response.json(rows[0], { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch query", details: err.message },
      { status: 500 }
    );
  }
}

// DELETE CLIENT QUERY
export async function DELETE(req, { params }) {
  try {
    const { queryId } = params;

    if (!queryId?.trim())
      return Response.json({ error: "queryId required" }, { status: 400 });

    const { clientId } = await req.json();

    if (!clientId?.trim())
      return Response.json({ error: "clientId required in body" }, { status: 400 });

    const check = await db
      .select()
      .from(queries)
      .where(and(eq(queries.queryId, queryId), eq(queries.clientId, clientId)));

    if (check.length === 0) {
      return Response.json(
        { error: "Query not found or you do not have permission to delete this query" },
        { status: 403 }
      );
    }

    await db.delete(queries).where(eq(queries.queryId, queryId));

    return Response.json({ message: "Query deleted successfully" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Failed to delete query", details: err.message },
      { status: 500 }
    );
  }
}
