import { db } from "@/db";
import { queries } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { requireSession } from "@/lib/auth/requireSession";


//http:url/api/queries?q=somequery
export async function GET(request) {
  try {

    const session = await requireSession();

    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No session" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const clientId = session.user.id;

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q || q.length === 0) {
      return Response.json([], { status: 200 });
    }

    const results = await db
      .select()
      .from(queries)
      .where(ilike(queries.questionTitle, `%${q}%`));

    return Response.json(results, { status: 200 });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
