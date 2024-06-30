import { auth } from "@/helpers/firebase";
import JwtService from "@/helpers/token/token.service";
import { authSchema, googleSchema } from "@/helpers/validation/auth.validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email, localId, name } = googleSchema.parse(body);
    const token = JwtService.generateTokenForUser({
      uid: localId,
      email: email,
      displayname: name,
    });
    return NextResponse.json({
      token,
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Provide the valid field", success: false },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { message: "Unable to create a user", success: false },
      { status: 500 }
    );
  }
}
