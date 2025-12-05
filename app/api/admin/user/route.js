import { db } from "@/lib/db";
import { clients } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";


// Create new client
export async function POST(req) {
  try {
    await verifyAdmin(req);

    const { clientId, username, email, password, phoneNumber } = await req.json();

    const exists = await db.select().from(clients).where(eq(clients.email, email));
    if (exists.length > 0) return Response.json({ message: "Client already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    await db.insert(clients).values({
      clientId,
      username,
      email,
      password: hashed,
      phoneNumber
    });

    return Response.json({ message: "Client created successfully" });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}


// Get all clients
export async function GET() {
  try {
    const result = await db.select().from(clients);
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
