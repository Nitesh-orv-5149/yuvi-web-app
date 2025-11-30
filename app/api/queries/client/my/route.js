import { db } from "@/lib/db";
import { queries } from "@/lib/schema/index";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const result = await db.select().from(queries).where(eq(queries.clientId, user.id));

    return Response.json(result);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
