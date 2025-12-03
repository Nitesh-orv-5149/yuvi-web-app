import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.queryId, answers.queryId));

    return Response.json(rows, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch queries", details: err.message },
      { status: 500 }
    );
  }
}
