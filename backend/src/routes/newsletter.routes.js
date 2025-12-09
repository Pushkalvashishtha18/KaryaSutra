import { Router } from "express";
import { body } from "express-validator";
import {
  deleteSubscriber,
  listSubscribers,
  subscribe,
} from "../controllers/newsletter.controller.js";
import { authGuard } from "../middleware/auth.js";

const router = Router();

router.post("/", [body("email").isEmail().normalizeEmail()], subscribe);
router.get("/", authGuard, listSubscribers);
router.delete("/:id", authGuard, deleteSubscriber);

export default router;

