import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    category:    { type: String, default: 'Full Stack' },
    description: { type: String, required: true },
    tech:        { type: [String], default: [] },
    image:       { type: String, default: '' },
    liveUrl:     { type: String, default: '' },
    githubUrl:   { type: String, default: '' },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);