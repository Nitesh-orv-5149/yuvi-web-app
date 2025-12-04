import { db } from "@/lib/db";
import { queries } from "@/lib/schema";
import { ilike } from "drizzle-orm";

//http:url/api/queries?q=somequery
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      const all = await db.select().from(queries);
      return Response.json(all, { status: 200 });
    }

    const results = await db
      .select()
      .from(queries)
      .where(ilike(queries.questionTitle, `%${q}%`));

    return Response.json(results, { status: 200 });

  } catch (err) {
    console.error(err);
    return Response.json({ error: `Server error ${err}` }, { status: 500 });
  }
}
