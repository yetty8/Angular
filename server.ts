const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the browser directory
app.use(express.static(path.join(__dirname, 'dist/natureAnimations/browser'), {
  maxAge: '1y'
}));

// Handle SPA (Single Page Application) routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/natureAnimations/browser/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist/natureAnimations/browser')}`);
});
