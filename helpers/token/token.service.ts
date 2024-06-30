import jwt from "jsonwebtoken";

type JWTUser = {
  uid: string;
  email: string;
  displayname?: string;
};

class JwtService {
  public static generateTokenForUser(user: JWTUser) {
    const token = jwt.sign(user, process.env.NEXT_PUBLIC_JWT_SECRET as string);
    return token;
  }

  public static decodeToken(token: string) {
    return jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    ) as JWTUser;
  }
}

export default JwtService;
