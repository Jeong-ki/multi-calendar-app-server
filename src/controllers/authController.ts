import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    console.log(process.env.DB_USER);

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser(email, username, hashedPassword);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (
      user.rows.length > 0 &&
      (await bcrypt.compare(password, user.rows[0].password))
    ) {
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET || "",
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
