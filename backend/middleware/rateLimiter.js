const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 100 * 60 * 1000, 
  max: 1000, 
});

module.exports = limiter;
