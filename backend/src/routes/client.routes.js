import { Router } from "express";
import { body } from "express-validator";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../controllers/client.controller.js";
import { authGuard } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getClients);

router.post(
  "/",
  authGuard,
  upload.single("image"),
  [body("name").notEmpty(), body("designation").notEmpty(), body("description").notEmpty()],
  createClient
);

router.put(
  "/:id",
  authGuard,
  upload.single("image"),
  [
    body("name").optional().notEmpty(),
    body("designation").optional().notEmpty(),
    body("description").optional().notEmpty(),
  ],
  updateClient
);

router.delete("/:id", authGuard, deleteClient);

export default router;

