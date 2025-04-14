const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // ← ADD THIS LINE
const connectDB = require('./connections/MongoConn.js');
const registrationRoutes = require('./routes/registration.js');
require('dotenv').config();

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://www.serranoartcamp.org',
  'https://serranoartcamp.org',
  'http://localhost:3000/api'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/registrations', registrationRoutes);

// Health check with mongoose status
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' // ← REQUIRES MONGOOSE
  });
});

// Conditional server start
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;