import { db } from "@/lib/schema/db";
import { categories } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";

//Register a category 
export async function POST(req) {
  try {
    await verifyAdmin(req);

    const { name, categoryId } = await req.json();

    // Check duplicate
    const exists = await db.select().from(categories).where(eq(categories.name, name));
    if (exists.length > 0) {
      return Response.json({ message: "Domain already exists" }, { status: 400 });
    }

    const domain = await db.insert(categories).values({
      categoryId,
      name,
    }).returning();

    return Response.json({ message: "Domain created", domain });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

//view a category
export async function GET(req) {
  try {
    await verifyAdmin(req);

    const allCategories = await db.select().from(categories);

    return Response.json(allCategories);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
