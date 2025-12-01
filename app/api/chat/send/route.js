import { db } from "@/lib/db";
import { messages, conversations } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { requireSession } from "@/lib/auth/requireSession";

export async function POST(req) {
  try {
    const session = await requireSession();
    const { conversationId, content } = await req.json();

    if (!content) {
      return Response.json({ error: "Empty message" }, { status: 400 });
    }

    const user = session.user;

    const messageId = uuidv4();

    await db.insert(messages).values({
      messageId,
      conversationId,
      senderId: user.id,
      senderRole: user.role,
      content,
    });

    await db
      .update(conversations)
      .set({
        lastMessageId: messageId,
        updatedAt: new Date(),
      })
      .where(eq(conversations.conversationId, conversationId));

    return Response.json({
      status: "success",
      message: {
        messageId,
        conversationId,
        senderId: user.id,
        senderRole: user.role,
        content,
        createdAt: new Date()
      }
    })  
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
