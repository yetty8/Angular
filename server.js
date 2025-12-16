const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files
const distPath = path.join(__dirname, 'dist/natureAnimations/browser');
app.use(express.static(distPath));

// Handle SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Serving from ${distPath}`);
  console.log(`🌐 Open: http://localhost:${PORT}`);
});
