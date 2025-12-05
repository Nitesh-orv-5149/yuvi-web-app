import { db } from "@/lib/db";
import { categories } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";


// fetch a perticular category
export async function GET(_, { params }) {
  const { categoryId } = params;
  const result = await db.select().from(categories).where(eq(categories.categoryId, categoryId));

  if (result.length === 0) return Response.json({ message: "Category not found" }, { status: 404 });
  return Response.json(result[0]);
}


// update a particular category
export async function PUT(req, { params }) {
  await verifyAdmin(req);
  const { categoryId } = params;
  const { name } = await req.json();

  const updated = await db.update(categories)
    .set({ name })
    .where(eq(categories.categoryId, categoryId))
    .returning();

  return Response.json({ message: "Category updated", updated });
}


// DELETE the selected category
export async function DELETE(req, { params }) {
  await verifyAdmin(req);
  const { categoryId } = params;

  await db.delete(categories).where(eq(categories.categoryId, categoryId));
  return Response.json({ message: "Category deleted successfully" });
}
