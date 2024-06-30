import { auth } from "@/helpers/firebase";
import { authSchema } from "@/helpers/validation/auth.validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = authSchema.parse(body);
    const user = await signInWithEmailAndPassword(auth, email, password);
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
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
