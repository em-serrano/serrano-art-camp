const express = require('express');
const app = express();

// 1. Enable CORS first
app.use(cors({ origin: '*' })); // Temp wildcard for testing

// 2. Body parser before routes
app.use(express.json());

// 3. Explicit test route
app.post('/api/registrations', (req, res) => {
  console.log('✅ Route hit');
  res.json({ success: true });
});

// 4. Export for Vercel
module.exports = app;

// 5. Local development listener
if (!process.env.VERCEL) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Local test server on port ${PORT}`);
  });
}