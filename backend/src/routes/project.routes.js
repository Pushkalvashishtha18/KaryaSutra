import { Router } from "express";
import { body } from "express-validator";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";
import { authGuard } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getProjects);

router.post(
  "/",
  authGuard,
  upload.single("image"),
  [body("name").notEmpty(), body("description").notEmpty()],
  createProject
);

router.put(
  "/:id",
  authGuard,
  upload.single("image"),
  [body("name").optional().notEmpty(), body("description").optional().notEmpty()],
  updateProject
);

router.delete("/:id", authGuard, deleteProject);

export default router;

