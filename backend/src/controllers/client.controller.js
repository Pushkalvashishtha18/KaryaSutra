import { validationResult } from "express-validator";
import Client from "../models/Client.js";
import { cropImage, publicUrlFromPath } from "../middleware/upload.js";

export const getClients = async (_req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
};

export const createClient = async (req, res, next) => {
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
    const client = await Client.create({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
      imageUrl,
    });
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const update = {
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
    };
    if (req.file) {
      const cropped = await cropImage(req.file.path);
      update.imageUrl = publicUrlFromPath(cropped);
    }
    const client = await Client.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!client) return res.status(404).json({ message: "Not found" });
    res.json(client);
  } catch (err) {
    next(err);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

