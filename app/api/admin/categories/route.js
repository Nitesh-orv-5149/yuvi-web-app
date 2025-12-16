import { db } from "@/lib/db";
import { categories } from "@/lib/schema"; // ensure schema/index.js exports categories
import { checkAuthLoginAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// verify user session (only admin allowed)
async function verifyAdmin(req) {
  const session = await getServerSession();
  if (!session || session.user.role !== "admin") {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  return session;
}

//  GET all categories
export async function GET() {
  try {
    const result = await db.select().from(categories);
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { name } = await req.json();

  await db.insert(categories).values({
    categoryId: randomUUID(),
    name,
  });

  return Response.json({ message: "Category added" });
}