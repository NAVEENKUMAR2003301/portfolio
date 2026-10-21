import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;