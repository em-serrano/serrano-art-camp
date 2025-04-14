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

connectDB()

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(csurf({ cookie: true }));

app.use('/api/registrations', registrationRoutes); 


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});


module.exports = app