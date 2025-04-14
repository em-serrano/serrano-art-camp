// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./connections/MongoConn.js');
const registrationRoutes = require('./routes/registration.js');
const bodyParser = require('body-parser');

// const cookieParser = require('cookie-parser');
// const csurf = require('csurf');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()

// Middleware
app.use(cors({
  origin: [
    'https://serranoartcamp.org',
    'https://www.serranoartcamp.org',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT']
}));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(csurf({ cookie: true }));

app.use('/api/registrations', registrationRoutes); 


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

if (process.env.LOCAL_DEVELOPMENT) {
  const PORT = 3000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Local server running on http://localhost:${PORT}`);
    });
  });
}


module.exports = app