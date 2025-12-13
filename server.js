const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files
const buildPath = path.join(__dirname, 'dist/natureAnimations/browser');
app.use(express.static(buildPath, {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.set('Content-Type', 'video/mp4');
    }
  }
}));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Serving from ${buildPath}`);
  console.log('\nTry these URLs:');
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- Direct video: ${Object.values(videoURLs)[0]}`);
});
