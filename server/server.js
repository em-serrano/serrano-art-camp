// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./connections/MongoConn.js');
const registrationRoutes = require('./routes/registration.js');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const sanitizeInput = require('./utils/sanitize'); // Youll need to create this
// const cookieParser = require('cookie-parser');
// const csurf = require('csurf');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()

// Middleware
app.use(cors()); // Change this to your frontend URL
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(csurf({ cookie: true }));

app.use('/api/registrations', registrationRoutes); 

// Rate limiter (15 mins, 5 requests max)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many registrations from this IP, please try again later.',
  },
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app