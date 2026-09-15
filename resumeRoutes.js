import { Router } from "express";
import { upload } from "../config/multerConfig.js";
import { analyzeResume, healthCheck } from "../controllers/resumeController.js";

const router = Router();

router.get("/health", healthCheck);

// multipart/form-data: fields = { resume: <file.pdf>, jobDescription?: string }
router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;
