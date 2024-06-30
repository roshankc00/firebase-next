import { auth } from "@/helpers/firebase";
import { authSchema } from "@/helpers/validation/auth.validation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = authSchema.parse(body);
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Provide the valid field", success: false },
        { status: 422 }
      );
    }
    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json(
        { message: "User with this email already exist", success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Unable to create a user", success: false },
      { status: 500 }
    );
  }
}
