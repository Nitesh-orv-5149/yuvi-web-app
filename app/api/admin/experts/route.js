import { db } from "@/lib/db";
import { experts } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";

export async function GET(req) {
  try {
    await verifyAdmin(req);

    const all = await db.select().from(experts);
    return Response.json(all);
  } catch (err) {
    console.error("GET EXPERTS ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
