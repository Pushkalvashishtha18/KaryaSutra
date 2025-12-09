import { validationResult } from "express-validator";
import Project from "../models/Project.js";
import { cropImage, publicUrlFromPath } from "../middleware/upload.js";

export const getProjects = async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let imageUrl = "";
    if (req.file) {
      const cropped = await cropImage(req.file.path);
      imageUrl = publicUrlFromPath(cropped);
    }
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl,
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const update = {
      name: req.body.name,
      description: req.body.description,
    };
    if (req.file) {
      const cropped = await cropImage(req.file.path);
      update.imageUrl = publicUrlFromPath(cropped);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

