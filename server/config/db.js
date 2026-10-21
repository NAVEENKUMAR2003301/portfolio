import mongoose from 'mongoose';

let cached = null;

export default function connectDB() {
  if (cached) return cached;

  cached = mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    })
    .then((conn) => {
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      return conn;
    })
    .catch((err) => {
      cached = null;
      console.error('❌ DB error:', err.message);
      throw err;
    });

  return cached;
}