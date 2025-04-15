import mongoose from 'mongoose';

let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb;
  }

  try {
    console.log("Connecting to MongoDB...");
    const db = await mongoose.connect(process.env.MONGO_URI);

    cachedDb = db;
    console.log("Successfully connected to MongoDB");
    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export default connectDB;
