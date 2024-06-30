import { NextRequest, NextResponse } from "next/server";
import JwtService from "./helpers/token/token.service";

export async function middleware(req: any) {
  const authorizationHeader = req.headers.get("authorization");
  if (!authorizationHeader) {
    return new Response("Unauthorized: Missing bearer token", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Bearer",
      },
    });
  }
  if (!authorizationHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = authorizationHeader.slice("Bearer ".length);
  const payload = await JwtService.decodeToken(token);
  if (!payload) {
    return new Response("Unauthorized", { status: 401 });
  }
  req.user = payload;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/me"],
};
