import express from "express";
import {
  signInUser,
  signUpUser,
  myInfo,
  reissuanceToken,
} from "../controllers/authController";
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
router.post("/refresh-token", reissuanceToken);

export default router;
