import { Request, Response } from "express";
import { AuthRequest, LoginCredentials } from "../types";
import { generateToken } from "../utils/jwt";

// Demo credentials
const DEMO_USER = {
  id: "demo-user-123",
  email: "admin@demo.com",
  password: "admin123",
  name: "Demo Admin",
};

export const login = (req: Request, res: Response): void => {
  try {
    const { email, password }: LoginCredentials = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // Check credentials
    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Generate JWT token
    const user = {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
    };

    const token = generateToken(user);

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      // Don't set domain in production to allow cross-origin cookies
      ...(process.env.NODE_ENV !== "production" ? { domain: "localhost" } : {}),
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      // Don't set domain in production to allow cross-origin cookies
      ...(process.env.NODE_ENV !== "production" ? { domain: "localhost" } : {}),
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyAuth = (req: AuthRequest, res: Response): void => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Verify auth error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
