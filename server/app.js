// ============================================
// MergeUi API Server
// ============================================
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://api.dicebear.com"],
      connectSrc: ["'self'", process.env.SUPABASE_URL || "https://agugcvugqjcetiulezim.supabase.co"],
      frameSrc: ["'none'"]
    }
  }
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1분
  max: 100, // IP당 100회
  message: { error: 'Too many requests. Please try again later.' }
});
app.use('/api/', limiter);

// --- Routes ---
app.use('/api/v1/auth', require('./api/auth'));
app.use('/api/v1/themes', require('./api/themes'));
app.use('/api/v1/components', require('./api/components'));
app.use('/api/v1/downloads', require('./api/downloads'));
app.use('/api/v1/inquiries', require('./api/inquiries'));
app.use('/api/v1/admin', require('./api/admin'));
app.use('/api/v1/webhooks', require('./api/webhooks'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`MergeUi API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
