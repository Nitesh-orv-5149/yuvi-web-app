import db from "@/lib/db";
import { queries, answers } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";  

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
