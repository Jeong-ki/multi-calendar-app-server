import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../models/userModel";
import { config } from "../utils/config";
import { getAuthToken } from "../utils/auth";

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

    const { id } = result.rows[0];
    const { token, refreshToken } = getAuthToken(id);

    res.status(201).json({ id, email, username, token, refreshToken });
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
      const { id, email, username } = user.rows[0];
      const { token, refreshToken } = getAuthToken(id);
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

export const reissuanceToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh Token is required" });
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.jwt.refreshSecretKey
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      config.jwt.secretKey,
      { expiresIn: Number(config.jwt.expiresInSec) }
    );

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      config.jwt.refreshSecretKey,
      { expiresIn: Number(config.jwt.refreshExpiresInSec) }
    );

    res.json({ newAccessToken, newRefreshToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid or Expired Refresh Token" });
  }
};
