import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

const app: Application = express();

// CORS configuration - works for both local and production
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL].filter(Boolean) // Production: only frontend URL if set
    : ["http://localhost:3000", "http://localhost:3001"]; // Development: allow local ports

const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (Postman, mobile apps, etc.) in development
    if (!origin && process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    // In production, require origin to be in allowed list
    if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_URL) {
      console.error("FRONTEND_URL environment variable is required in production");
      return callback(new Error("CORS configuration error"));
    }

    if (allowedOrigins.includes(origin || "")) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}. Allowed origins:`, allowedOrigins);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
