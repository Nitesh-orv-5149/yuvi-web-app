import { db } from "@/lib/db";
import { queries } from "@/lib/schema/index";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const { title, description, domain } = await req.json();

    const [created] = await db.insert(queries).values({
      title,
      description,
      domain,
      clientId: user.id,
      status: "pending"
    }).returning();

    return Response.json(created);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
