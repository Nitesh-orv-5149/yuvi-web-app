import { db } from "@/db";
import { queries, categories } from "@/db/schema";
import { ilike, eq, desc } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";


// GET /api/queries?q={searchTerm}&categoryId=123&page=1&limit=10
export async function GET(req) {
  try {
    const session = await requireSession();
    if (!session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const q = url.searchParams.get("q")?.trim();
    const categoryId = url.searchParams.get("categoryId");
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 10);

    let result;
    
    // Search by question title (https://url/api/queries?q=searchTerm)
    if (q) {
      result = await db
        .select()
        .from(queries)
        .where(ilike(queries.questionTitle, `%${q}%`));

      return Response.json({ data: result }, { status: 200 });
    }

    //https://url/api/queries?categoryId=123 - Filter by category
    if (categoryId) {

      const exists = await db
        .select()
        .from(categories)
        .where(eq(categories.categoryId, categoryId));

      if (exists.length === 0) {
        return Response.json({ error: "Category not found" }, { status: 404 });
      }

      result = await db
        .select()
        .from(queries)
        .where(eq(queries.categoryId, categoryId));

      return Response.json({ data: result }, { status: 200 });
    }

    // Pagination - https://url/api/queries?page=1&limit=10
    result = await db
      .select()
      .from(queries)
      .orderBy(desc(queries.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return Response.json({ data: result }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: `Server error ${err}` }, { status: 500 });
  }
}
