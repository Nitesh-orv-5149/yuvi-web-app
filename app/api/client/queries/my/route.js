import { db } from "@/lib/db";
import { queries } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const clientId = req.nextUrl.searchParams.get("clientId");

    if (!clientId?.trim()) {
      return Response.json({ error: "clientId query param required" }, { status: 400 });
    }

    const rows = await db.select().from(queries).where(eq(queries.clientId, clientId));

    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
