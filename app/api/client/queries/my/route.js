import { db } from "@/lib/db";
import { queries } from "@/lib/schema";
import { eq } from "drizzle-orm";

// GET ALL QUERIES POSTED BY THE CLIENT
export async function GET(req) {
  try {
    const clientId = req.nextUrl.searchParams.get("clientId");

    if (!clientId?.trim())
      return Response.json({ error: "clientId required" }, { status: 400 });

    const rows = await db.select().from(queries).where(eq(queries.clientId, clientId));

    return Response.json(rows, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch client queries", details: err.message },
      { status: 500 }
    );
  }
}
