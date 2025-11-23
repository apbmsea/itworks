import { ApiError } from "../utils/apiError.js";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error" });
};
