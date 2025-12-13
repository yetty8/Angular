const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Angular build output
const buildPath = path.join(__dirname, 'dist/natureAnimations/browser');

// Safety check
if (!require('fs').existsSync(buildPath)) {
  console.error('❌ BUILD FOLDER NOT FOUND:', buildPath);
}

// Serve Angular files
app.use(express.static(buildPath));

// SPA fallback (must be LAST)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Serving from ${buildPath}`);
});
