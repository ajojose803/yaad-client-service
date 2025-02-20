import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("admin_token", "", { maxAge: 0 }); // Clear cookie
  return response;
}
