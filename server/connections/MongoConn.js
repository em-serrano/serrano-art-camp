const mongoose = require('mongoose');
require('dotenv').config();

// Connection caching with error recovery
let cachedDb = null;
let connectionAttempts = 0;
const MAX_RETRIES = 3;

async function connectDB() {
  // Return cached connection if available and ready
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('✅ Using existing database connection');
    return cachedDb;
  }

  try {
    const client = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      retryReads: true,
      appName: 'serrano-art-camp'
    });

    console.log('✅ MongoDB connected successfully');
    cachedDb = client;
    connectionAttempts = 0; // Reset on success
    
    // Event listeners for production monitoring
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
      cachedDb = null; // Clear cache on error
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection disconnected');
      cachedDb = null;
    });

    return client;
  } catch (err) {
    connectionAttempts++;
    console.error(`⚠️ MongoDB connection failed (attempt ${connectionAttempts}):`, err.message);
    
    if (connectionAttempts >= MAX_RETRIES) {
      console.error('🔥 Maximum connection attempts reached');
      process.exit(1);
    }
    
    // Exponential backoff retry
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, connectionAttempts)));
    return connectDB();
  }
}

// Production-grade shutdown handlers
const gracefulShutdown = async () => {
  try {
    await mongoose.disconnect();
    console.log('🛑 MongoDB connection closed gracefully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to close MongoDB connection:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = connectDB;