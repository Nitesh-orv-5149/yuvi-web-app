import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(queries)
      .innerJoin(answers, eq(queries.queryId, answers.queryId));

    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
