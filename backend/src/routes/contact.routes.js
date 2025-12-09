import { Router } from "express";
import { body } from "express-validator";
import { listContacts, submitContact } from "../controllers/contact.controller.js";
import { authGuard } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  [
    body("fullName").notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("mobile").isLength({ min: 8 }),
    body("city").notEmpty(),
  ],
  submitContact
);

router.get("/", authGuard, listContacts);

export default router;

