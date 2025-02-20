import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Fetch tokens from cookies
  const adminToken = req.cookies.get("admin-token");
  const vendorToken = req.cookies.get("vendor-token");
  const userToken = req.cookies.get("user-token");

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/vendor/login") ||
    pathname.startsWith("/vendor/signup") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup")
  ) {
    return NextResponse.next(); // Allow access to login/signup
  }

  // Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    if (!adminToken) return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Protect Vendor Routes
  if (pathname.startsWith("/vendor")) {
    if (!vendorToken) return NextResponse.redirect(new URL("/vendor/login", req.url));
  }

  // Protect User Routes
  if (pathname.startsWith("/user")) {
    if (!userToken) return NextResponse.redirect(new URL("/user/login", req.url));
  }

  return NextResponse.next(); // Allow request if authentication is valid
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*", "/user/:path*"], // Middleware runs on these routes
};
