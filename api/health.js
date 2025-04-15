// /api/health.js
module.exports = (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  };
  