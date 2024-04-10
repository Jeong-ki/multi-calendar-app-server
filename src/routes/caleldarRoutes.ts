import express from "express";
import { isAuth } from "../utils/auth";
import { getMemosByMonth, saveMemo } from "../controllers/calendarController";

const router = express.Router();

router.post("/memo", isAuth, saveMemo);
router.get("/memo/:year/:month", isAuth, getMemosByMonth);

export default router;
