import { Router } from "express";
import { login, logout, verifyAuth } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", authenticate, verifyAuth);

export default router;
