import { Request, Response, NextFunction } from "express";
import { register, login } from "../services/auth.service";
import { getTokerFromRequest, getUserFromToken } from "../utils/helpers";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await register(req.body);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokerFromRequest(req);
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      const user = await getUserFromToken(token);
      res.status(200).json({ user });
    }
  } catch (err) {
    next(err);
  }
};
