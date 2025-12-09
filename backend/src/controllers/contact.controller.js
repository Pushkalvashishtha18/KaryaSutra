import { validationResult } from "express-validator";
import Contact from "../models/Contact.js";

export const submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, mobile, city } = req.body;
    const contact = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

export const listContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(),
    ]);
    res.json({ items, page, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

