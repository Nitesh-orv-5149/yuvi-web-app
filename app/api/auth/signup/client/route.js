import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { clients } from "@/lib/schema";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    let { username, email, password, phoneNumber } = body;

    if (!username || !email || !password || !phoneNumber) {
      return Response.json(
        { error: "username, email, phoneNumber, password are required" },
        { status: 400 }
      );
    }

    username = username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    phoneNumber = String(phoneNumber).trim();

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
      .from(clients)
      .where(
        or(
          eq(clients.email, email),
          eq(clients.username, username)
        )
      );

    if (existing.length > 0) {
      const match = existing[0];

      if (match.email === email) {
        return Response.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }

      if (match.username === username) {
        return Response.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.insert(clients).values({
      clientId: uuidv4(),
      username,
      email,
      phoneNumber,
      password: hashed,
    });

    return Response.json(
      { message: "Client created successfully" },
      { status: 201 }
    );

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
