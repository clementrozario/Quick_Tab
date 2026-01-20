import express from "express";
import { uploadLogo as uploadLogoController } from "../controllers/user.contoller";
import { uploadLogo as uploadLogoMiddleware } from "../middlewares/upload";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router()

router.post('/profile/logo', verifyToken, uploadLogoMiddleware, uploadLogoController);

export default router;

