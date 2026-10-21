import { Router } from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', async (_req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});

// Protected
router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;