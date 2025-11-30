import db from "@/lib/db";
import { answers, experts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
  try {
    const { queryId } = params;

    if (!queryId) {
      return new Response("Missing queryId", { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response("Authorization header missing", { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return new Response("Token missing", { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response("Invalid token", { status: 401 });
    }

    const expertId = decoded.expertId;
    if (!expertId) {
      return new Response("Invalid token payload", { status: 401 });
    }

    const { answerBody } = await req.json();

    if (!answerBody || answerBody.trim() === "") {
      return new Response("answerBody is required", { status: 400 });
    }

    const newAnswer = await db
      .insert(answers)
      .values({
        answerId: crypto.randomUUID(),
        queryId,
        expertId,
        answerBody,
      })
      .returning();

    await db
      .update(experts)
      .set({
        queriesAnswered: experts.queriesAnswered + 1,
      })
      .where(eq(experts.expertId, expertId));

    return new Response(JSON.stringify(newAnswer[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
