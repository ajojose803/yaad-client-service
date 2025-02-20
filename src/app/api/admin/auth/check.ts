import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("admin_token");
  
  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  // Verify token logic (call AuthService)
  const isValid = await fetch("http://auth-service/verify", {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (!isValid.ok) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  return NextResponse.json({ loggedIn: true, name: "Admin Name" });
}
