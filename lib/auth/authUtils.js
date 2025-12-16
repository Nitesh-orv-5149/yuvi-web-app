import { db } from "../db";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { admin } from "../schema";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function checkAuthLogin({ identifier, password, table, roleName }) {
  const res = await db
    .select()
    .from(table)
    .where(
      or(
        eq(table.email, identifier.toLowerCase()),
        eq(table.username, identifier)
      )
    )
    .limit(1);

  const row = res[0];
  if (!row) return null;

  const match = await bcrypt.compare(password, row.password);
  if (!match) return null;

  return {
    id: row.clientId || row.expertId,
    name: row.username || row.name,
    email: row.email,
    username: row.username,
    role: roleName,

    categoryId: row.categoryId ?? null,
  };
}


// ADMIN LOGIN

export async function checkAuthLoginAdmin({ identifier, password }) {
 
  const result = await db
    .select()
    .from(admin)
    .where(eq(admin.email, identifier.toLowerCase()))
    .limit(1);

  const adminUser = result[0];
  if (!adminUser) return null;

  console.log("Admin user found:", adminUser);

  const match = await bcrypt.compare(password, adminUser.password);
  if (!match) {
    console.log("Password mismatch for admin:", identifier);
    return null
  };


  return {
    id: adminUser.adminId,
    email: adminUser.email,
    username: "admin",   
    role: "admin",
  };
}

export async function verifyAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized - Admin Only");
  }

  return session.user;
}