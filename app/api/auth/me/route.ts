import { auth } from "@/helpers/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import JwtService from "@/helpers/token/token.service";

export async function GET(req: any) {
  try {
    const headersList = headers();
    const authorization = headersList.get("authorization")?.split(" ")[1];
    if (authorization) {
      const user = await JwtService.decodeToken(authorization);
      return NextResponse.json({ user, success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "token Expired", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to get a user", success: false },
      { status: 500 }
    );
  }
}
