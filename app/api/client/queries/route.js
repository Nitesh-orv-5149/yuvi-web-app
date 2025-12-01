import { authOptions } from "@/lib/auth/authOptions";
import { requireSession } from "@/lib/auth/requireSession";
import { db } from "@/lib/db";
import { queries, clients, categories } from "@/lib/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();
    const { questionTitle, questionBody, categoryId } = body;

    const session = await requireSession()

    const clientId = session.user.id

    console.log("body: ", body, session)

    // Validate fields
    if (!questionTitle?.trim()) {
      return Response.json({ error: "questionTitle is required" }, { status: 400 });
    }

    if (!questionBody?.trim()) {
      return Response.json({ error: "questionBody is required" }, { status: 400 });
    }

    if (!categoryId?.trim()) {
      return Response.json({ error: "categoryId is required" }, { status: 400 });
    }

    // Check client exists
    const clientCheck = await db.select().from(clients).where(eq(clients.clientId, clientId));
    if (clientCheck.length === 0) {
      return Response.json({ error: "Client does not exist" }, { status: 404 });
    }

    // Check category exists
    const categoryCheck = await db.select().from(categories).where(eq(categories.categoryId, categoryId));
    if (categoryCheck.length === 0) {
      return Response.json({ error: "Category does not exist" }, { status: 404 });
    }

    // Create query
    const [created] = await db.insert(queries).values({
      queryId: randomUUID(),
      questionTitle: questionTitle.trim(),
      questionBody: questionBody.trim(),
      clientId,
      categoryId,
    }).returning();

    return Response.json(created, { status: 201 });

  } catch (err) {
    return Response.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
