import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema/index";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select()
      .from(queries)
      .innerJoin(answers, eq(queries.id, answers.queryId));

    return Response.json(result);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
