import { db } from "../db";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

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
