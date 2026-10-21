import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
const users = await User.find({}, { email: 1, _id: 0 });
console.log('Users in DB:', users);
await mongoose.disconnect();
process.exit(0);