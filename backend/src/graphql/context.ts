import type { Request } from "express";
import { verifyJwt, type JwtPayload } from "../utils/jwt";

export interface GraphqlContext {
  user: JwtPayload | null;
}

export function buildContext({ req }: { req: Request }): GraphqlContext {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { user: null };
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const payload = verifyJwt(token);
  return { user: payload };
}
