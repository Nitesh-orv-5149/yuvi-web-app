import { db } from "@/lib/db";
import { queries } from "@/lib/schema/index";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { experts,queries } from "@/lib/schema/index";
import { requireSession } from "@/lib/auth/requireSession";

export async function GET(request) {
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