import { auth } from "@/helpers/firebase";
import JwtService from "@/helpers/token/token.service";
import { authSchema } from "@/helpers/validation/auth.validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email, password } = authSchema.parse(body);
    const user = await signInWithEmailAndPassword(auth, email, password);
    const token = await JwtService.generateTokenForUser({
      uid: user?.user?.uid,
      email: user?.user?.email || "",
    });
    console.log(token, "wowowow");
    return NextResponse.json({
      token,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Provide the valid field", success: false },
        { status: 422 }
      );
    }
    if (error.code === "auth/invalid-credential") {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Unable to create a user", success: false },
      { status: 500 }
    );
  }
}
