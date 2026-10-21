import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = 'uploads';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  }
});

const fileFilter = (_req, file, cb) => {
  /image\/(jpeg|jpg|png|webp|gif)/.test(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only image files are allowed'));
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});