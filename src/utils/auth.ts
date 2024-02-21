import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../models/userModel";
import { config } from "./config";

const AUTH_ERROR = { message: "Authentication Error" };
const WRONG_TOKEN = { message: "Token has wrong" };
const EXPIRED_TOKEN = { message: "Token has expired" };

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(WRONG_TOKEN);
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json(EXPIRED_TOKEN);
    }
    if (error) {
      return res.status(401).json(WRONG_TOKEN);
    }

    if (!decoded || typeof decoded === "string") {
      return res.status(401).json(AUTH_ERROR);
    }

    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    req.userId = user.rows[0].id;
    next();
  });
};
