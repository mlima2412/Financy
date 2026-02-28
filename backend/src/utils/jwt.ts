import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  email: string;
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
