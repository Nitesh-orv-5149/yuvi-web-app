import { db } from "@/lib/db";
import { queries } from "@/lib/schema";
import { randomUUID } from "crypto";

export async function POST(req) {
  try {
    const { questionTitle, questionBody, clientId, categoryId } = await req.json();

    if (!clientId || !categoryId) {
      return Response.json({ error: "clientId and categoryId required" }, { status: 400 });
    }

    const [created] = await db.insert(queries).values({
      queryId: randomUUID(),
      questionTitle,
      questionBody,
      clientId,
      categoryId,
    }).returning();

    return Response.json(created, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
