const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// ===== BUILD PATH =====
const BUILD_PATH = path.join(__dirname, 'dist/natureAnimations/browser');

if (!fs.existsSync(BUILD_PATH)) {
  console.error('❌ BUILD FOLDER NOT FOUND:', BUILD_PATH);
} else {
  console.log('✅ Serving build from:', BUILD_PATH);
}

// ===== SERVE ANGULAR STATIC FILES =====
app.use(express.static(BUILD_PATH));

// ===== VIDEO STREAMING (RANGE SUPPORT) =====
app.get('/assets/videos/:video', (req, res) => {
  const videoPath = path.join(
    BUILD_PATH,
    'assets/videos',
    req.params.video
  );

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send('Video not found');
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    });

    fs.createReadStream(videoPath).pipe(res);
  }
});

// ===== SPA FALLBACK =====
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
