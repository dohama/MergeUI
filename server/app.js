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
      // TODO: Remove 'unsafe-inline' after migrating inline scripts to external files
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://api.dicebear.com"],
      connectSrc: ["'self'", process.env.SUPABASE_URL || "https://agugcvugqjcetiulezim.supabase.co"],
      frameSrc: ["'none'"]
    }
  }
}));
var allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({ origin: function(origin, cb) { if (!origin || allowedOrigins.indexOf(origin) !== -1) cb(null, true); else cb(null, false); }, credentials: true }));

// Webhook은 raw body가 필요하므로 express.json() 전에 마운트
app.use('/api/v1/webhooks', require('./api/webhooks'));

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
app.use('/api/v1/checkout', require('./api/checkout'));

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
