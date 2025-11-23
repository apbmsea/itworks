import { Request } from "express";

export const getAccessTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return null;

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) return null;

  return token;
};
