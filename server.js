const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const buildPath = path.join(__dirname, 'dist/natureAnimations');
// Add MIME types for video files
const mimeTypes = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

// Add this before your static file middleware
app.use((req, res, next) => {
  const ext = path.extname(req.url);
  if (mimeTypes[ext]) {
    res.setHeader('Content-Type', mimeTypes[ext]);
  }
  next();
});

// Check if build directory exists
if (!fs.existsSync(buildPath)) {
  console.error('Build directory not found. Make sure to run "npm run build" before starting the server.');
  console.log('Current directory contents:', fs.readdirSync(path.join(__dirname, 'dist')));
  process.exit(1);
}

// Serve static files from the dist directory
app.use(express.static(buildPath));

// Handle SPA (Single Page Application) routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));