import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';

dotenv.config();

const projects = [
  {
    title: 'Millet Project',
    category: 'Full Stack Web Development',
    description:
      'A modern web application focused on millet products, combining an engaging interface with practical web functionality.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://millet-project-clql.vercel.app/',
    githubUrl: '',
    featured: true,
    order: 1
  },
  {
    title: 'Consistency – Productivity Dashboard',
    category: 'Productivity & Finance',
    description:
      'A personal productivity application to organize tasks, track income and expenses, and build consistent daily habits.',
    tech: ['React.js', 'JavaScript', 'Chart.js', 'LocalStorage'],
    liveUrl: 'https://project-of-consistency.vercel.app/',
    githubUrl: '',
    featured: true,
    order: 2
  },
  {
    title: 'NavMusic',
    category: 'Music Web Application',
    description:
      'A music discovery and playback interface built to explore music using API integration, focused on a simple listening experience.',
    tech: ['React.js', 'REST API', 'JavaScript', 'CSS3'],
    liveUrl: 'https://navmusicplay.netlify.app/',
    githubUrl: '',
    featured: true,
    order: 3
  },
  {
    title: 'Steward Decor',
    category: 'React & Full Stack Development',
    description:
      'An event and wedding-focused website designed to showcase services and provide an accessible enquiry flow for customers.',
    tech: ['React.js', 'Responsive Design', 'Bootstrap'],
    liveUrl: 'https://stewdec.netlify.app/',
    githubUrl: '',
    featured: false,
    order: 4
  }
];

await mongoose.connect(process.env.MONGO_URI);

const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
if (!existing) {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await User.create({ email: process.env.ADMIN_EMAIL, password: hash });
  console.log('✅ Admin created:', process.env.ADMIN_EMAIL);
} else {
  console.log('ℹ️  Admin already exists');
}

if ((await Project.countDocuments()) === 0) {
  await Project.insertMany(projects);
  console.log('✅ Projects seeded');
}

await mongoose.disconnect();
process.exit(0);