// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Angular build output
const buildPath = path.join(__dirname, 'dist/natureAnimations/browser');

// Safety check
if (!fs.existsSync(buildPath)) {
  console.error('❌ BUILD FOLDER NOT FOUND:', buildPath);
}

// Serve static files
app.use(express.static(buildPath));

// SPA fallback for Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Something went wrong!');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Serving from ${buildPath}`);
});
