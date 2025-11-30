import { db } from "../db";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

// LOGIN FOR CLIENTS & EXPERTS
export async function checkAuthLogin({ identifier, password, table, roleName }) {
  // Try matching both email and username
  const res = await db
    .select()
    .from(table)
    .where(
      or(
        eq(table.email, identifier.toLowerCase()),  // email login
        eq(table.username, identifier)              // username login
      )
    )
    .limit(1);

  const row = res[0];
  if (!row) return null;

  // Verify password
  const match = await bcrypt.compare(password, row.password);
  if (!match) return null;

  // Return normalized user object for NextAuth
  return {
    id: row.clientId || row.id || row.roleId || row.student_id,
    name: row.username || row.name,
    email: row.email,
    username: row.username,
    role: roleName,
  };
}

// TEMP ADMIN LOGIN
const adminIdentifier = "admin@gmail.com";
const adminPassword = "adminpass";

export async function checkAuthLoginAdmin({ identifier, password }) {
  if (
    identifier.toLowerCase() === adminIdentifier.toLowerCase() &&
    password === adminPassword
  ) {
    return {
      id: "admin-1",
      name: "Admin",
      email: adminIdentifier,
      username: "admin",
      role: "admin",
    };
  }

  return null;
}
