// utils/sanitize.js
module.exports = function sanitizeInput(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/<[^>]*>?/gm, '');
  };
  