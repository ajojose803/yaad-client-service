import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("user-refreshToken");
  console.log(token);
  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  // Call AuthService to verify token
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
    headers: { Authorization: `Bearer ${token.value}` },
  });
console.log(res);
  if (!res.ok) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  const userData = await res.json();
  return NextResponse.json({ loggedIn: true, ...userData });
}
