const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; // Changed back to 8080

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from the dist directory
const buildPath = path.join(__dirname, 'dist/natureAnimations/browser');
app.use(express.static(buildPath));

// Serve videos from the assets/videos directory
app.use('/assets/videos', express.static(path.join(buildPath, 'assets/videos')));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('File not found');
    }
  });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving from: ${buildPath}`);
  console.log('Try these URLs:');
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}/assets/videos/ocean.mp4`);
});
