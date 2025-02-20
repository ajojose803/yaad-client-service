// import { NextResponse } from "next/server";
// import { serialize } from "cookie";

// export async function POST(request: Request) {
//   const { name, email, phone, password, userImage, otp } = await request.json();
  
//   // Call your registerUseCase logic
//   const response = await registerUseCase.registerUser(name, email, password, phone, userImage, otp);
  
//   if (response.message !== "Success") {
//     return NextResponse.json({ message: response.message }, { status: 400 });
//   }
  
//   // Set the refresh token as an HTTP‑only cookie:
//   const cookie = serialize("user_refreshToken", response.refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//   });
  
//   const res = NextResponse.json({
//     message: "Success",
//     _id: response._id,
//     name: response.name,
//     email: response.email,
//     image: response.image,
//     // Optionally include an access token if you plan to store it in memory,
//     // but ideally rely on the cookie for secure storage.
//     token: response.token,
//   });
  
//   res.headers.append("Set-Cookie", cookie);
//   return res;
// }
