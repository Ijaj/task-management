import express from "express";
import { getTasks } from "../controllers/user.controller";
import { header } from "express-validator";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/tasks",
  [
    header("authorization")
      .exists()
      .withMessage("Authorization header is missing")
      .matches(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/)
      .withMessage("Invalid Authorization header format"),
    validateMiddleware,
    authMiddleware,
  ],
  getTasks
);
export default router;
