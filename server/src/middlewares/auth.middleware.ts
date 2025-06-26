import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model"; // Adjust import path as needed
import { ApiError } from "../utils/ApiError";
import { getUserFromToken } from "../utils/helpers";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization token missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = getUserFromToken(token);
    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};
