import express from "express";
import { signInUser, signUpUser, myInfo } from "../controllers/authController";
import { isAuth } from "../utils/auth";

const router = express.Router();

router.post("/signUp", signUpUser);
router.post("/signIn", signInUser);
router.get("/myInfo", isAuth, myInfo);

export default router;
