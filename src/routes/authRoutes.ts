import express from "express";
import { signInUser, signUpUser, myInfo } from "../controllers/authController";
import { isAuth } from "../utils/auth";
import {
  signInValidationRules,
  signUpValidationRules,
  validate,
} from "../utils/validators/userValidator";

const router = express.Router();

router.post("/signUp", signUpValidationRules(), validate, signUpUser);
router.post("/signIn", signInValidationRules(), validate, signInUser);
router.get("/myInfo", isAuth, myInfo);

export default router;
