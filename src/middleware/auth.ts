import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("Authentication failed: No token found in cookies");
      console.log("Available cookies:", Object.keys(req.cookies));
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const user = verifyToken(token);

    if (!user) {
      console.log("Authentication failed: Invalid or expired token");
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
