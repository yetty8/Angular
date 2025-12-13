const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

const buildPath = path.join(__dirname, 'dist/nature-animations');

// 🔎 DEBUG: confirm build exists
if (!fs.existsSync(buildPath)) {
  console.error('❌ BUILD FOLDER NOT FOUND:', buildPath);
  process.exit(1);
}

console.log('✅ Serving Angular from:', buildPath);

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
