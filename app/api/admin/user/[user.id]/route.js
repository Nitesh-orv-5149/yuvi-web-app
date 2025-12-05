import { db } from "@/lib/db";
import { clients } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";


// Update/edit user
export async function PUT(req, { params }) {
  try {
    await verifyAdmin(req);
    const { username, email, phoneNumber } = await req.json();

    await db.update(clients)
      .set({ username, email, phoneNumber })
      .where(eq(clients.clientId, params.clientId));

    return Response.json({ message: "Client updated" });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}


// Delete user
export async function DELETE(req, { params }) {
  try {
    await verifyAdmin(req);

    await db.delete(clients)
      .where(eq(clients.clientId, params.clientId));

    return Response.json({ message: "Client deleted successfully" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
