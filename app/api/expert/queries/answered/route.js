import { db } from "@/lib/db";
import { queries, answers, experts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { requireSession } from "@/lib/auth/requireSession";


//http:url/api/expert/queries/answered (gets all answered queries for logged in expert)
export async function GET(req) {
  try {

    const session = await requireSession();
    const expertId = session.user?.id;

    if (!expertId) {
      return new Response("Unauthorized", { status: 401 });
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

//http:url/api/expert/queries/answered (to post a new answer to a query)
export async function POST(request) {
  try {
    const session = await requireSession();
    const expertId = session.user?.id;

    if (!expertId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const expertData = await db
      .select()
      .from(experts)
      .where(eq(experts.expertId, expertId))
      .limit(1);

    if (expertData.length === 0) {
      return new Response(JSON.stringify({ error: "Expert not found" }), {
        status: 404,
      });
    }

    const expert = expertData[0];
    const { queryId, answerBody } = await request.json();

    if (!queryId || !answerBody) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: queryId, answerBody",
        }),
        { status: 400 }
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
      });
    }

    const queryItem = queryData[0];

    if (queryItem.categoryId !== expert.categoryId) {
      return new Response(
        JSON.stringify({
          error: "Expert cannot answer queries outside their domain",
        }),
        { status: 403 }
      );
    }

    const answerId = randomUUID();

    const inserted = await db
      .insert(answers)
      .values({
        answerId,
        queryId,
        expertId,
        answerBody,
      })
      .returning();

    return new Response(
      JSON.stringify({
        message: "Answer added successfully",
        answer: inserted[0],
      }),
      { status: 201 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}

//http:url/api/expert/queries/answered (to delete an answer) {body: {answerId: '...'}}
export async function DELETE(request) {
  try {

    const session = await requireSession();
    const expertId = session.user?.id;

    if (!expertId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { answerId } = await request.json();

    if (!answerId) {
      return new Response(
        JSON.stringify({ error: "answerId missing in request body" }),
        { status: 400 }
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

    if (existing[0].expertId !== expertId) {
      return new Response(
        JSON.stringify({ error: "Not allowed to delete this answer" }),
        { status: 403 }
      );
    }

    await db.delete(answers).where(eq(answers.answerId, answerId));

    return new Response(
      JSON.stringify({ success: true, message: "Answer deleted" }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}
