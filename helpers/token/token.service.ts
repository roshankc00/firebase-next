import { SignJWT, jwtVerify, type JWTPayload } from "jose";

type JWTUser = {
  uid: string;
  email: string;
  displayname?: string;
};

class JwtService {
  public static generateTokenForUser(user: JWTUser) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7; //  7 day

    return new SignJWT(user)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(
        new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string)
      );
  }

  public static async decodeToken(token: string) {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string)
    );
    return payload;
  }
}

export default JwtService;
