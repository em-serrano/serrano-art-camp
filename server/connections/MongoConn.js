const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { // ← MUST reference MONGO_URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fail fast if no DB
      socketTimeoutMS: 45000 // Close idle connections
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process on failure
  }
}

// Event listeners for production monitoring
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await mongoose.disconnect();
  console.log('Mongoose connection closed');
  process.exit(0);
});

module.exports = connectDB;