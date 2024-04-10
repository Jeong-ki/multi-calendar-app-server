import { Request, Response } from "express";
import { createMemo, findMemosByMonth } from "../models/calendarModal";

export const saveMemo = async (req: Request, res: Response) => {
  const { year, month, day, memo } = req.body;
  const userId = req.userId as number;

  try {
    const result = await createMemo(userId, year, month, day, memo);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error: Save Memo Error" });
  }
};

export const getMemosByMonth = async (req: Request, res: Response) => {
  const { year, month } = req.params;
  const userId = req.userId as number;

  try {
    const result = await findMemosByMonth(userId, Number(year), Number(month));
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server Error: Get Month Memo" });
  }
};
