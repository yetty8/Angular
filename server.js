const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const buildPath = path.join(__dirname, 'dist/nature-animations');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), err => {
    if (err) {
      console.error(err);
      res.status(404).send('Not found');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving from ${buildPath}`);
});
