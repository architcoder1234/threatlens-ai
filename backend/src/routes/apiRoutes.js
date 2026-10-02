import express from 'express';
import multer from 'multer';
import { analysisController } from '../controllers/analysisController.js';

const router = express.Router();

// Configure multer for in-memory screenshot uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (PNG, JPG, WEBP) are supported for screenshot analysis.'), false);
    }
  }
});

// Analyze Endpoints
router.post('/analyze/url', (req, res) => analysisController.analyzeUrl(req, res));
router.post('/analyze/message', (req, res) => analysisController.analyzeMessage(req, res));
router.post('/analyze/email', (req, res) => analysisController.analyzeEmail(req, res));
router.post('/analyze/payment', (req, res) => analysisController.analyzePayment(req, res));
router.post('/analyze/screenshot', upload.single('screenshot'), (req, res) => analysisController.analyzeScreenshot(req, res));

// History Endpoints
router.get('/history', (req, res) => analysisController.getHistory(req, res));
router.get('/history/:id', (req, res) => analysisController.getHistoryById(req, res));
router.delete('/history/:id', (req, res) => analysisController.deleteHistoryItem(req, res));
router.delete('/history', (req, res) => analysisController.clearHistory(req, res));

// Educational & Demo Endpoints
router.get('/learning', (req, res) => analysisController.getLearning(req, res));
router.get('/demo', (req, res) => analysisController.getDemoExamples(req, res));
router.post('/quiz/submit', (req, res) => analysisController.submitQuiz(req, res));

export default router;
