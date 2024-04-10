import pool from "../utils/db";

export const createMemo = async (
  userId: number,
  year: number,
  month: number,
  day: number,
  memo: string
) => {
  return pool.query(
    "INSERT INTO calendar (user_id, year, month, day, memo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, year, month, day, memo]
  );
};
