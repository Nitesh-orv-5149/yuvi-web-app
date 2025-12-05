import { db } from "@/lib/schema/db";
import { experts } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";  

export async function POST(req) {
  try {
    await verifyAdmin(req);

    const data = await req.json();

    const expert = await db.insert(experts).values({
      expertId: data.expertId,
      name: data.name,
      email: data.email,
      domain: data.domain,
      experience: data.experience,
    }).returning();

    return Response.json({ message: "Expert created", expert });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await verifyAdmin(req);

    const allExperts = await db.select().from(experts);

    return Response.json(allExperts);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
