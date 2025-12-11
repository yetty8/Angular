const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/nature-animations')));

// Serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/nature-animations/index.html'));
});

app.listen(PORT, () => {
  console.log(`✔ Server running on port ${PORT}`);
});
