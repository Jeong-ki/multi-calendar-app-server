import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../models/userModel";
import { config } from "../utils/config";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const user = await findUserByEmail(email);

    if (user.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "User already exists with the provided email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser(email, username, hashedPassword);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (
      user.rows.length > 0 &&
      (await bcrypt.compare(password, user.rows[0].password))
    ) {
      const token = jwt.sign(
        { userId: user.rows[0].id },
        config.jwt.secretKey,
        { expiresIn: Number(config.jwt.expiresInSec) }
      );
      const refreshToken = jwt.sign(
        { userId: user.rows[0].id },
        config.jwt.refreshSecretKey,
        { expiresIn: Number(config.jwt.refreshExpiresInSec) }
      );
      const { id, email, username } = user.rows[0];
      res.json({ id, email, username, token, refreshToken });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const myInfo = async (req: Request, res: Response) => {
  try {
    const id = req.userId as number;
    const user = await findUserById(id);
    if (user.rows.length > 0) {
      const { id, email, username, created_at } = user.rows[0];
      res.json({ id, email, username, created_at });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
