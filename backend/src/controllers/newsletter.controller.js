import { validationResult } from "express-validator";
import Newsletter from "../models/Newsletter.js";

export const subscribe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({ message: "Already subscribed", email });
    }
    const entry = await Newsletter.create({ email });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const listSubscribers = async (_req, res, next) => {
  try {
    const subs = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subs);
  } catch (err) {
    next(err);
  }
};

export const deleteSubscriber = async (req, res, next) => {
  try {
    const removed = await Newsletter.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

