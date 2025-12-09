import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

router.post("/", authGuard, upload.single("image"), uploadImage);

export default router;

