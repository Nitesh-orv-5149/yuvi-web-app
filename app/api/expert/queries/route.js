import { db } from "@/lib/db";
import { queries } from "@/lib/schema/index";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { experts,queries } from "@/lib/schema/index";

export async function GET(request) {
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

    // The expert's domain/category
    const domainCategoryId = expert.categorySlug; 

    // 4. Fetch all queries that match the expert's domain
    const domainQueries = await db
      .select()
      .from(queries)
      .where(eq(queries.categoryId, domainCategoryId));

    // 5. Return response
    return new Response(
      JSON.stringify({
        expertId: expert.expertId,
        category: domainCategoryId,
        count: domainQueries.length,
        queries: domainQueries,
      }),
      {
        status: 200,
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