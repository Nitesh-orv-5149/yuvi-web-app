import { db } from "@/lib/db";
import { categories } from "@/lib/schema/index";
import { verifyAdmin } from "@/lib/auth/authUtils";
import { eq } from "drizzle-orm";

// update a particular category
export async function PUT(req, context) {
  try {
    const params = await context.params;               // ⭐ must await

    const id = params.categoriesId;                    // ⭐ correct param key

    const { name, desc } = await req.json();

    console.log("UPDATE REQUEST ->", { id, name, desc });

    await db.update(categories)
      .set({ name, desc })
      .where(eq(categories.categoryId, id));

    return Response.json({ message: "Updated Successfully" });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE the selected category
export async function DELETE(req, context) 
{ const { categoriesId } = await context.params;
 console.log("DELETE executed =>", categoriesId); 
 await db.delete(categories) 
  .where(eq(categories.categoryId, categoriesId));
  return Response.json({ message: "Category deleted" }); }


