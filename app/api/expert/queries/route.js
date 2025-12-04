import { db } from "@/lib/db";
import { experts, queries } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";

//http:url/api/expert/queries (gets all queries for logged in expert's domain)
export async function GET(request) {
  try {
    const session = await requireSession();

    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const expertId = session.user.id;

    const expertData = await db
      .select()
      .from(experts)
      .where(eq(experts.expertId, expertId))
      .limit(1);

    if (expertData.length === 0) {
      return new Response(JSON.stringify({ error: "Expert not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const expert = expertData[0];

    const domainCategoryId = expert.categoryId;

    const domainQueries = await db
      .select()
      .from(queries)
      .where(eq(queries.categoryId, domainCategoryId));

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
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

//http:url/api/expert/queries (testing endpoint)
export async function POST(request) {
  return Response.json(
    { message: "experts endpoint alive" },
    { status: 200 }
  );
}
