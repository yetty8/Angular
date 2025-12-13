const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const BUILD_PATH = path.join(__dirname, 'dist/natureAnimations/browser');

// ✅ 1. Static files FIRST (this enables range requests)
app.use(express.static(BUILD_PATH, {
  acceptRanges: true,
  fallthrough: true
}));

// ✅ 2. SPA fallback LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
