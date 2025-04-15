// /connections/MongoConn.js
const mongoose = require('mongoose');

let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }
  
  const db = await mongoose.connect(process.env.MONGO_URI);
  
  cachedDb = db;
  return cachedDb;
}

module.exports = connectDB;
