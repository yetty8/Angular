const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Correct Angular build output
const buildPath = path.join(__dirname, 'dist/natureAnimations/browser');

console.log('Serving Angular from:', buildPath);

// Serve Angular static files (JS, CSS, assets, videos)
app.use(express.static(buildPath));

// SPA fallback (Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
