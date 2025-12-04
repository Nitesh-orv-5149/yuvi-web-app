import { db } from "@/lib/db";
import { categories } from "@/lib/schema";

export async function GET() {
  try {
    const rows = await db.select().from(categories);
    return Response.json(rows, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch categories", details: err.message },
      { status: 500 }
    );
  }
}   
