import { Request, Response, NextFunction } from "express";
import { getTokerFromRequest, getUserIdFromToken } from "../utils/helpers";
import { User } from "../models/user.model";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  try {
    const token = getTokerFromRequest(req);
    const id = getUserIdFromToken(token);
    const user = await User.findById(id).populate("tasks");
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.status(200).json(user.tasks);
    }
  } catch (err) {
    next(err);
  }
};
