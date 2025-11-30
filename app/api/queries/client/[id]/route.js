import { db } from "@/lib/db";
import { queries, answers } from "@/lib/schema/index";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const result = await db
      .select()
      .from(queries)
      .leftJoin(answers, eq(queries.id, answers.queryId))
      .where(eq(queries.id, id));

    return Response.json(result[0]);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
