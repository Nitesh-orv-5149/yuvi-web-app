import { db } from "@/lib/db";
import { conversations, messages, clients, experts } from "@/lib/schema";
import { eq, or, desc } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";

export async function GET() {
  try {
    const session = await requireSession();
    const user = session.user;

    const convos = await db
      .select()
      .from(conversations)
      .where(
        or(
          eq(conversations.clientId, user.id),
          eq(conversations.expertId, user.id)
        )
      )
      .orderBy(desc(conversations.updatedAt));

    return Response.json(convos);

  } catch (err) {
    console.error("INBOX ERROR:", err);
    return Response.json({ error: `Server error : ${err}` }, { status: 500 });
  }
}
