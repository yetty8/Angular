import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the dist directory
const staticPath = path.join(__dirname, 'dist/natureAnimations');
app.use(express.static(staticPath));

// Explicit route for videos
app.get('/assets/videos/:video', (req, res) => {
  const videoPath = path.join(staticPath, 'browser/assets/videos', req.params.video);
  if (fs.existsSync(videoPath)) {
    res.sendFile(videoPath);
  } else {
    console.error(`Video not found: ${videoPath}`);
    res.status(404).send('Video not found');
  }
});

// Handle SPA routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, 'browser/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving files from: ${staticPath}`);
  console.log(`Browser path exists: ${fs.existsSync(path.join(staticPath, 'browser'))}`);
  console.log(`Videos directory exists: ${fs.existsSync(path.join(staticPath, 'browser/assets/videos'))}`);
});

export default app;