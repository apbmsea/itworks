import { jwtService } from "../services/jwt.service.js";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { getAccessTokenFromHeader } from "../utils/getAccessTokenFromHeader.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getAccessTokenFromHeader(req);

    if (!token) {
      throw ApiError.unauthorized("Access token missing");
    }

    const payload = jwtService.verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
