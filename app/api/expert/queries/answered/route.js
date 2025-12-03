import db from "@/lib/db";
import { queries, answers, experts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { requireSession } from "@/lib/auth/requireSession";

export async function GET(req) {
  try {
    const session = await requireSession()

    const expertId = session.user.id

    const result = await db
      .selectDistinct({
        queryId: queries.queryId,
        questionTitle: queries.questionTitle,
        questionBody: queries.questionBody,
        clientId: queries.clientId,
        categoryId: queries.categoryId,
        createdAt: queries.createdAt,
      })
      .from(answers)
      .leftJoin(queries, eq(answers.queryId, queries.queryId))
      .where(eq(answers.expertId, expertId))
      .orderBy(desc(queries.createdAt));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return new Response("Server error", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await requireSession()

    const expertData = await db
      .select()
      .from(experts)
      .where(eq(experts.expertId, session.user.id))
      .limit(1);

    if (expertData.length === 0) {
      return new Response(JSON.stringify({ error: "Expert not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const expert = expertData[0];

    const { queryId, answerBody } = await request.json();

    if (!queryId || !answerBody) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: queryId, answerBody",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const queryData = await db
      .select()
      .from(queries)
      .where(eq(queries.queryId, queryId))
      .limit(1);

    if (queryData.length === 0) {
      return new Response(JSON.stringify({ error: "Query not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const queryItem = queryData[0];

    if (queryItem.categoryId !== expert.categorySlug) {
      return new Response(
        JSON.stringify({
          error: "Expert cannot answer queries outside their domain",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const answerId = randomUUID();

    const inserted = await db
      .insert(answers)
      .values({
        answerId,
        queryId,
        expertId: expert.expertId,
        answerBody,
      })
      .returning();

    return new Response(
      JSON.stringify({
        message: "Answer added successfully",
        answer: inserted[0],
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const session = await requireSession()

    const { answerId } = await request.json();

    if (!answerId) {
      return new Response(
        JSON.stringify({ error: "answerId missing in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const existing = await db
      .select()
      .from(answers)
      .where(eq(answers.answerId, answerId))
      .limit(1);

    if (existing.length === 0) {
      return new Response(
        JSON.stringify({ error: "Answer not found" }),
        { status: 404 }
      );
    }

    if (existing[0].expertId !== session.user.id) {
      return new Response(
        JSON.stringify({ error: "Not allowed to delete this answer" }),
        { status: 403 }
      );
    }

    await db.delete(answers).where(eq(answers.answerId, answerId));

    return new Response(
      JSON.stringify({ success: true, message: "Answer deleted" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}