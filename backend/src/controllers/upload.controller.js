import { cropImage, publicUrlFromPath } from "../middleware/upload.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const cropped = await cropImage(req.file.path);
    res.status(201).json({ url: publicUrlFromPath(cropped) });
  } catch (err) {
    next(err);
  }
};

