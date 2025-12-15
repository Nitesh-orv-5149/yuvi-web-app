import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Middleware Token:", token);

  // allow auth routes always
  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // unauthenticated
  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/admin", req.url));
    }
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // role checks
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/admin", req.url));
  }

  if (pathname.startsWith("/client") && token.role !== "client") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname.startsWith("/expert") && token.role !== "expert") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/client/:path*",
    "/expert/:path*",
  ],
};
