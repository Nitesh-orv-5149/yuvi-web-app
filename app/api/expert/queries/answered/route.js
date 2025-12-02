import db from "@/lib/db";
import { queries, answers, experts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export async function GET(req) {
  try {
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

    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const expertData = await db
      .select()
      .from(experts)
      .where(eq(experts.expertId, payload.id))
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
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

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

    if (existing[0].expertId !== payload.id) {
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