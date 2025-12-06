import { db } from "@/lib/db";
import { experts, categories, answers } from "@/lib/schema/index";
import { eq, sql } from "drizzle-orm";

export async function GET(req) {
  try {
    const allExperts = await db
      .select({
        expertId: experts.expertId,
        username: experts.username,
        email: experts.email,
        bio: experts.bio,
        categoryId: experts.categoryId,
        categoryName: categories.name,
        answersCount: sql`COUNT(${answers.answerId})`.as('answersCount'),
      })
      .from(experts)
      .leftJoin(categories, eq(experts.categoryId, categories.categoryId))
      .leftJoin(answers, eq(experts.expertId, answers.expertId))
      .groupBy(
        experts.expertId,
        experts.username,
        experts.email,
        experts.bio,
        experts.categoryId,
        categories.name
      );

    return Response.json(allExperts);
  } catch (err) {
    console.error("GET EXPERTS ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
