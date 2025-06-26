import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const register = async ({ name, email, password }: any) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
};

export const login = async ({ email, password }: any) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const deleteUser = async (id: string) => {
  const d = await User.deleteOne({ _id: id });
  return d.deletedCount;
};
