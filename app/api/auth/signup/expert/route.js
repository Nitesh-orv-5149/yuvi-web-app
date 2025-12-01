import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { categories, experts } from "@/lib/schema";
import { db } from "@/lib/db";


// Expert Signup
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("body: ", body)
    let { username, email, password, phoneNumber, categoryId, bio } = body;

    if (!username || !email || !password || !phoneNumber || !categoryId) {
      return Response.json(
        { error: "username, email, phoneNumber, password, categoryId are required" },
        { status: 400 }
      );
    }

    username = username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    phoneNumber = String(phoneNumber).trim();
    categoryId = categoryId.trim();
    bio = bio?.trim() || null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const phoneRegex = /^[0-9+\- ]{7,20}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return Response.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(experts)
      .where(
        or(
          eq(experts.expertEmail, email),
          eq(experts.expertUsername, username)
        )
      );

    if (existing.length > 0) {
      const match = existing[0];

      if (match.expertEmail === email) {
        return Response.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }

      if (match.expertUsername === username) {
        return Response.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
    }

    const categoryExists = await db
        .select()
        .from(categories)
        .where(eq(categories.categoryId, categoryId))
        .limit(1);

    if (categoryExists.length === 0) {
        return Response.json(
            { error: "Invalid category selected" },
            { status: 400 }
        );
    }


    const hashed = await bcrypt.hash(password, 10);

    await db.insert(experts).values({
      expertId: uuidv4(),
      expertUsername: username,
      expertEmail: email,
      expertPassword: hashed,
      expertPhoneNumber: phoneNumber,
      categoryId,
      bio,
      isApproved: false,
      postsAnswered: 0,
    });

    return Response.json(
      { message: "Expert created successfully, pending approval" },
      { status: 201 }
    );

  } catch (err) {
    console.error("EXPERT SIGNUP ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
