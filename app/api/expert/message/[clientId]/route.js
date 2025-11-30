import db from "@/lib/db";
import { messages } from "@/lib/schema";
import { eq, and, asc } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    const { clientId } = params;
    if (!clientId) {
      return new Response("Client ID missing", { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) return new Response("Unauthorized", { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token) return new Response("Token missing", { status: 401 });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response("Invalid token", { status: 401 });
    }

    const expertId = decoded.expertId;
    if (!expertId) return new Response("Invalid token payload", { status: 401 });

    const result = await db
      .select()
      .from(messages)
      .where(
        and(
          eq(messages.clientId, clientId),
          eq(messages.expertId, expertId)
        )
      )
      .orderBy(asc(messages.createdAt));

    await db
      .update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.clientId, clientId),
          eq(messages.expertId, expertId)
        )
      );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const { clientId } = params;
    if (!clientId) {
      return new Response("Client ID missing", { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) return new Response("Unauthorized", { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token) return new Response("Token missing", { status: 401 });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response("Invalid token", { status: 401 });
    }

    const expertId = decoded.expertId;
    if (!expertId) return new Response("Invalid token payload", { status: 401 });

    const { content } = await req.json();
    if (!content || content.trim() === "") {
      return new Response("Message content required", { status: 400 });
    }

    const newMessage = await db
      .insert(messages)
      .values({
        messageId: crypto.randomUUID(),
        clientId,
        expertId,
        content,
      })
      .returning();

    return new Response(JSON.stringify(newMessage[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
