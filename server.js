const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Angular build output
const BUILD_PATH = path.join(__dirname, 'dist/natureAnimations/browser');

if (!fs.existsSync(BUILD_PATH)) {
  console.error('❌ BUILD FOLDER NOT FOUND:', BUILD_PATH);
} else {
  console.log('✅ Serving Angular from:', BUILD_PATH);
}

// ✅ Serve ALL Angular static files (assets, js, css, videos)
app.use(express.static(BUILD_PATH));

// ✅ SPA fallback (must be LAST)
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
