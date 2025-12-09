import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${unique}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image uploads are allowed"), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });

export const cropImage = async (filePath) => {
  const output = `${filePath}-cropped.jpg`;
  try {
    await sharp(filePath).resize(450, 350, { fit: "cover" }).toFile(output);
    fs.unlinkSync(filePath);
    return output;
  } catch (err) {
    console.warn("Sharp not available or failed; using original image", err.message);
    return filePath;
  }
};

export const publicUrlFromPath = (localPath) => {
  const relative = path.relative(process.cwd(), localPath).replace(/\\/g, "/");
  return `/${relative}`;
};

