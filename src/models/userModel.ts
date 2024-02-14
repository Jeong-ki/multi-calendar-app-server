import pool from "../utils/db";

export const createUser = async (
  email: string,
  username: string,
  hashedPassword: string
) => {
  return pool.query(
    "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
    [email, username, hashedPassword]
  );
};

export const findUserByEmail = async (email: string) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};
