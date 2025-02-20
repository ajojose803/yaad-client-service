// // Next.js Middleware for authentication check
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// interface MiddlewareRequest extends NextRequest {
//   nextUrl: NextRequest['nextUrl'];
// }

// export async function middleware(req: MiddlewareRequest): Promise<NextResponse> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('auth_token'); // Get access token from cookies

//   // If the user is trying to access a public page like login/signup, allow it
//   if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") {
//     return NextResponse.next();
//   }

//   // If no token, redirect to login page
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/dashboard/*", // Apply this middleware only for protected routes like /dashboard, etc.
// };
