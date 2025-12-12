import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Serve static files from the correct directories
app.use(express.static(path.join(__dirname, 'dist/natureAnimations/browser')));
app.use('/assets', express.static(path.join(__dirname, 'dist/natureAnimations/browser/assets')));

// Handle SPA routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist/natureAnimations/browser/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, 'dist/natureAnimations/browser')}`);
  console.log(`Assets directory exists: ${require('fs').existsSync(path.join(__dirname, 'dist/natureAnimations/browser/assets'))}`);
});

export default app;