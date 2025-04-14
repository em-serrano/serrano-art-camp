const express = require('express');
const cors = require('cors');
const connectDB = require('./connections/MongoConn');
const registrationRoutes = require('./routes/registration');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/registrations', registrationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Connect DB and start if local
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Local server running on ${PORT}`));
  });
}

module.exports = app;