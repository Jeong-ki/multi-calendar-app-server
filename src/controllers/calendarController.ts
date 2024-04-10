import { Request, Response } from "express";
import { createMemo } from "../models/calendarModal";

export const saveMemo = async (req: Request, res: Response) => {
  const { year, month, day, memo } = req.body;
  const userId = req.userId;

  try {
    if (!userId) throw new Error("Not Found User ID");
    const result = await createMemo(userId, year, month, day, memo);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Save Memo Error" });
  }
};
