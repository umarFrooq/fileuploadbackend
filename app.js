// app.js
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('./config/passport'); // Initialize passport

const app = express();

// Security Headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Or 'unsafe-none' if 'require-corp' is too restrictive
  next();
});

// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// It's generally better to have express.json() before CORS and other middleware that might need the body.
app.use(express.json());

// Add OPTIONS handler - ensure this is effective.
// The general cors() middleware above should handle OPTIONS for routes it applies to.
// This app.options('*', cors()) can be a fallback but might be redundant if the main cors config is broad enough.
// For now, let's keep it to ensure preflight requests are handled.
app.options('*', cors()); // This should use the same config as above or be more specific if needed.

app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// ... rest of your app configuration ...