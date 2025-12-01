import { authOptions } from "@/lib/auth/authOptions";
import { requireSession } from "@/lib/auth/requireSession";
import { db } from "@/lib/db";
import { queries } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const session = await requireSession()

    const clientId = session.id
    const rows = await db.select().from(queries).where(eq(queries.clientId, clientId));

    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
