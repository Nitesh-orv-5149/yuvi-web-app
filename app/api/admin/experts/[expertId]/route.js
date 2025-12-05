import { db } from "@/lib/schema/db";
import { experts } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";

//EDIT/Update THE EXPERT
export async function PATCH(req, { params }) {
  try {
    await verifyAdmin(req);

    const { expertId } = params;
    const body = await req.json();

    const updated = await db
      .update(experts)
      .set(body)
      .where(eq(experts.expertId, expertId))
      .returning();

    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

//DELETE THE EXPERT
export async function DELETE(req, { params }) {
  try {
    await verifyAdmin(req);

    const { expertId } = params;

    await db.delete(experts).where(eq(experts.expertId, expertId));

    return Response.json({ message: "Expert deleted" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
