import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authorizationHeader = req.headers.get("authorization");
  if (!authorizationHeader) {
    return new Response("Unauthorized: Missing bearer token", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Bearer",
      },
    });
  }
  const token = authorizationHeader.slice("Bearer ".length);
  if (!authorizationHeader.startsWith("Bearer ") && !token) {
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/me"],
};
