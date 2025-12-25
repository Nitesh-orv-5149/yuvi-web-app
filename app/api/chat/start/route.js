import { db } from "@/lib/db";
import { conversations, clients, experts } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { requireSession } from "@/lib/auth/requireSession";

export async function POST(req) {
  try {
    let session = null;

    try {
      session = await requireSession();
    } catch {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { otherUserId } = await req.json();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;
    const isClient = user.role === "client";
    const isExpert = user.role === "expert";

    if (!isClient && !isExpert) {
      return Response.json({ error: "Role not allowed" }, { status: 403 });
    }

    const clientId = isClient ? user.id : otherUserId;
    const expertId = isExpert ? user.id : otherUserId;


    const clientCheck = await db
      .select()
      .from(clients)
      .where(eq(clients.clientId, clientId))
      .limit(1);

    if (clientCheck.length === 0) {
      return Response.json({ error: "Client does not exist" }, { status: 404 });
    }

    const expertCheck = await db
      .select()
      .from(experts)
      .where(eq(experts.expertId, expertId))
      .limit(1);

    if (expertCheck.length === 0) {
      return Response.json({ error: "Expert does not exist" }, { status: 404 });
    }

    const existing = await db
      .select()
      .from(conversations)
      .where(and(
        eq(conversations.clientId, clientId),
        eq(conversations.expertId, expertId)
      ))
      .limit(1);

    if (existing.length > 0) {
      return Response.json({ conversationId: existing[0].conversationId });
    }

    const newId = uuidv4();

    await db.insert(conversations).values({
      conversationId: newId,
      clientId,
      expertId,
    });

    return Response.json({ conversationId: newId });

  } catch (err) {
    console.error("START DM ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
