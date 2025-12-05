import { db } from "@/lib/db";
import { conversations, messages, clients, experts } from "@/lib/schema";
import { eq, or, desc } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";

export async function GET() {
  try {
    const session = await requireSession();
    const user = session.user;

    const convos = await db
      .select({
        conversationId: conversations.conversationId,
        clientId: conversations.clientId,
        expertId: conversations.expertId,
        lastMessageId: conversations.lastMessageId,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,

        clientName: clients.username,
        expertName: experts.username
      })
      .from(conversations)
      .leftJoin(clients, eq(conversations.clientId, clients.clientId))
      .leftJoin(experts, eq(conversations.expertId, experts.expertId))
      .where(
        or(
          eq(conversations.clientId, user.id),
          eq(conversations.expertId, user.id)
        )
      )
      .orderBy(desc(conversations.updatedAt));

    console.log(convos);
    return Response.json(convos);

  } catch (err) {
    console.error("INBOX ERROR:", err);
    return Response.json({ error: `Server error : ${err}` }, { status: 500 });
  }
}
