import { db } from "@/lib/db";
import { messages, conversations } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";

export async function POST(req) {
  try {
    const session = await requireSession();
    const { messageId } = await req.json();

    const user = session.user;

    // Fetch the message
    const msg = await db
      .select()
      .from(messages)
      .where(eq(messages.messageId, messageId))
      .limit(1);

    if (msg.length === 0) {
      return Response.json({ error: "Message not found" }, { status: 404 });
    }

    const message = msg[0];

    // Only the sender can delete
    if (message.senderId !== user.id) {
      return Response.json(
        { error: "You cannot delete this message" },
        { status: 403 }
      );
    }

    // Soft delete the message
    await db
      .update(messages)
      .set({ 
        deleted: true,
        content: "Message Deleted",
        attachmentUrl: null,
      })
      .where(eq(messages.messageId, messageId));

    return Response.json({message: "success", messageId: messageId});

  } catch (err) {
    console.error("DELETE MESSAGE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
