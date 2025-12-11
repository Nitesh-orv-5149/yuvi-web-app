import { db } from "@/lib/db";
import { experts } from "@/lib/schema/index";
import { eq } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth/authUtils";



// ADMIN approving an expert
export async function PATCH(req, { params }) {
  try {
    await verifyAdmin(req);

    const { expertId } = await params;   // ✅ FIX: await params
    const { isApproved } = await req.json();

    await db
      .update(experts)
      .set({ isApproved })
      .where(eq(experts.expertId, expertId));

    return Response.json({
      message: "Expert updated successfully",
      expertId,
      isApproved,
    });
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}



//admin can remove am exitisting expert
export async function DELETE(req, { params }) {
  try {
    await verifyAdmin(req);

    const { expertId } = await params;  // ✅ FIX: await params

    await db
      .delete(experts)
      .where(eq(experts.expertId, expertId));

    return Response.json({
      message: "Expert deleted successfully",
      expertId,
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}