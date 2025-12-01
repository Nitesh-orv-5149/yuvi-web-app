import { authOptions } from "@/lib/auth/authOptions";
import NextAuth from "next-auth";

// Common Signin
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
