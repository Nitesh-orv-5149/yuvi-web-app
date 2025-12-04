import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // PUBLIC ROUTES THAT REQUIRE NO AUTH
  const publicRoutes = ["/auth", "/auth/admin", "/"];

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // NON-AUTHENTICATED USERS
  if (!token) {
    if (path.startsWith("/admin")) {
      url.pathname = "/auth/admin";
      return NextResponse.redirect(url);
    }

    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // ADMIN-ONLY ROUTES
  if (path.startsWith("/admin")) {
    if (token.role !== "admin") {
      url.pathname = "/auth/admin";
      return NextResponse.redirect(url);
    }
  }

  // CLIENT-ONLY ROUTES
  if (path.startsWith("/client")) {
    if (token.role !== "client") {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  // EXPERT-ONLY ROUTES
  if (path.startsWith("/expert")) {
    if (token.role !== "expert") {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/client/:path*",
    "/expert/:path*",
    "/auth",
    "/",
  ],
};
