import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

await connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(',') || '*',
    credentials: true
  })
);
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (_req, res) => res.send('Portfolio API is running 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));