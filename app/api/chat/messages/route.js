import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { eq, desc, and } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";

export async function GET(req) {
  try {
    await requireSession();

    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    const cursor = Number(searchParams.get("cursor") || 0);

    const result = await db
      .select()
      .from(messages)
      .where(
        and(
            eq(messages.conversationId, conversationId),
            eq(messages.deleted, false)
        ))
      .orderBy(desc(messages.createdAt))
      .limit(20)
      .offset(cursor);

    return Response.json(result);

  } catch (err) {
    console.error("FETCH MESSAGES ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
