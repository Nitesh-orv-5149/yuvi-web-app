import { db } from "@/lib/db";
import { answers, clients, categories, experts, queries } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const { queryId } = await params;

    if (!queryId?.trim()) {
      return Response.json({ error: "queryId required" }, { status: 400 });
    }

    const queryRows = await db
      .select({
        queryId: queries.queryId,
        questionTitle: queries.questionTitle,
        questionBody: queries.questionBody,
        createdAt: queries.createdAt,

        clientId: clients.clientId,
        clientUsername: clients.username,
        clientEmail: clients.email,

        categoryId: categories.categoryId,
        categoryName: categories.name,
      })
      .from(queries)
      .leftJoin(clients, eq(queries.clientId, clients.clientId))
      .leftJoin(categories, eq(queries.categoryId, categories.categoryId))
      .where(eq(queries.queryId, queryId));

    if (queryRows.length === 0) {
      return Response.json({ error: "Query not found" }, { status: 404 });
    }

    const queryData = queryRows[0];

    const answerRows = await db
      .select({
        answerId: answers.answerId,
        answerBody: answers.answerBody,
        createdAt: answers.createdAt,

        // expert info
        expertId: experts.expertId,
        expertUsername: experts.username,
        expertEmail: experts.email,
      })
      .from(answers)
      .leftJoin(experts, eq(answers.expertId, experts.expertId))
      .where(eq(answers.queryId, queryId));

      console.log({
        query: queryData,
        answers: answerRows,
      });
      
    return Response.json(
      {
        query: queryData,
        answers: answerRows,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        error: "Failed to fetch query",
        details: err.message,
      },
      { status: 500 }
    );
  }
}

// DELETE CLIENT QUERY
export async function DELETE(req, { params }) {
  try {
    const { queryId } = await params;

    if (!queryId?.trim())
      return Response.json({ error: "queryId required" }, { status: 400 });

    const { clientId } = await req.json();

    if (!clientId?.trim())
      return Response.json({ error: "clientId required in body" }, { status: 400 });

    const check = await db
      .select()
      .from(queries)
      .where(and(eq(queries.queryId, queryId), eq(queries.clientId, clientId)));

    if (check.length === 0) {
      return Response.json(
        { error: "Query not found or you do not have permission to delete this query" },
        { status: 403 }
      );
    }

    await db.delete(queries).where(eq(queries.queryId, queryId));

    return Response.json({ message: "Query deleted successfully" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Failed to delete query", details: err.message },
      { status: 500 }
    );
  }
}
