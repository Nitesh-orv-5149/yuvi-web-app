import { db } from "@/lib/db";
import { admin } from "@/lib/schema/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

export async function POST(req) {
  console.log("ADMIN LOGIN WORkING");

  try {
    const { email, password } = await req.json();
    console.log("LOGIN EMAIL:", email); 
    const result = await db.select().from(admin).where(eq(admin.email, email));
    console.log("DB RESULT:", result); 

    if (result.length === 0) {
      return Response.json({ message: "Admin not found" }, { status: 404 });
    }
    const adminUser = result[0];
    const match = await bcrypt.compare(password, adminUser.password);

    if (!match) {
      return Response.json({ message: "Incorrect password" }, { status: 401 });
    }
    const token = jwt.sign({ adminId: adminUser.adminId },process.env.ADMIN_SECRET, { expiresIn: "5d" } );

    return Response.json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
