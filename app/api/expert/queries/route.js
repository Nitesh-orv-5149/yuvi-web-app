import { db } from "@/lib/db";
import { queries } from "@/lib/schema/index";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { experts } from "@/lib/schema/index";

//fetch queries for expert's domain
export async function GET(request) {
    try {
        const token = request.headers.get("authorization")?.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const expert = await db.select().from(experts).where(eq(experts.userId, user.id)).limit(1);

        if (expert.length === 0) {
            return Response.json({ error: "Expert not found" }, { status: 404 });
        }
        const expertId = expert[0].id;

        const expertQueries = await db.select().from(queries).where(eq(queries.expertId, expertId));
        return Response.json(expertQueries);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}