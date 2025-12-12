const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Trust the proxy in production (needed for Railway)
app.set('trust proxy', 1);

// Get the absolute path to the dist folder
const buildPath = path.join(__dirname, 'dist/natureAnimations');
const videosPath = path.join(buildPath, 'assets/videos');

// Middleware to log requests (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files with proper caching
app.use(express.static(buildPath, {
  etag: true,
  lastModified: true,
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4') || path.endsWith('.webm')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// Specific route for videos
app.use('/assets/videos', express.static(videosPath, {
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

// Handle SPA (Single Page Application) routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${buildPath}`);
  console.log(`Videos path: ${videosPath}`);
  console.log(`Test video URL: http://localhost:${PORT}/assets/videos/volcano.mp4`);
});
