import express from "express";
import {
  signInUser,
  signUpUser,
  myInfo,
  refreshUser,
} from "../controllers/authController";
import { isAuth } from "../utils/auth";
import {
  signInValidationRules,
  signUpValidationRules,
  validate,
} from "../utils/validators/userValidator";

const router = express.Router();

router.post("/signup", signUpValidationRules(), validate, signUpUser);
router.post("/signin", signInValidationRules(), validate, signInUser);
router.get("/my", isAuth, myInfo);
router.post("/refresh-user", refreshUser);

export default router;
