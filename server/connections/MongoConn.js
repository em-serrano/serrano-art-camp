import mongoose from 'mongoose';

let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    cachedDb = db;
    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export default connectDB;
