const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'POST, GET, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
