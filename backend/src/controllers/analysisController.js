import { urlAnalyzer } from '../services/urlAnalyzer.js';
import { messageAnalyzer } from '../services/messageAnalyzer.js';
import { emailAnalyzer } from '../services/emailAnalyzer.js';
import { ocrService } from '../services/ocrService.js';
import { audioVishingAnalyzer } from '../services/audioVishingAnalyzer.js';
import { riskEngine } from '../engines/riskEngine.js';
import { aiService } from '../services/aiService.js';
import { recommendationService } from '../services/recommendationService.js';
import { historyStore } from '../services/historyService.js';
import { LEARNING_MODULES, QUIZ_QUESTIONS } from '../data/learningData.js';
import { DEMO_EXAMPLES } from '../data/demoData.js';
import { MULTILANG_LEARNING } from '../data/multilingualData.js';

class AnalysisController {
  /**
   * Helper to execute common post-processing pipeline
   */
  async _runPipeline({ inputType, indicators, categories, rawContent, previewSnippet, metadata = {} }) {
    // 1. Calculate explainable risk score
    const riskData = riskEngine.calculateRisk({ indicators, categories });
    const { riskScore, riskLevel, colorScheme, scoreBreakdown, uniqueIndicators } = riskData;

    // 2. Format structured "Why is this suspicious?" cards
    const whySuspicious = uniqueIndicators.map(ind => ({
      title: ind.title,
      severity: ind.severity,
      explanation: ind.explanation,
      evidence: ind.evidence
    }));

    // 3. Generate actionable recommendations
    const recommendations = recommendationService.generateRecommendations({
      riskScore,
      riskLevel,
      indicators: uniqueIndicators,
      categories
    });

    // 4. Generate AI explanations & educational insight
    const aiResult = await aiService.generateExplanation({
      inputType,
      indicators: uniqueIndicators,
      rawContent,
      riskScore,
      riskLevel,
      categories
    });

    // 5. Structure final payload
    const report = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      inputType,
      riskScore,
      riskLevel,
      colorScheme,
      confidence: indicators.length > 0 ? 'high' : 'medium',
      categories: categories.length > 0 ? categories : ['Low-risk content'],
      scoreBreakdown,
      whySuspicious,
      evidence: uniqueIndicators.map(i => ({ type: i.type, evidence: i.evidence, severity: i.severity })),
      recommendations,
      explanation: aiResult.summary,
      learningInsight: aiResult.learningInsight,
      metadata,
      previewSnippet
    };

    // Save to persistent sanitized history
    historyStore.add(report);

    return report;
  }

  // POST /api/analyze/url
  async analyzeUrl(req, res) {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string' || !url.trim()) {
        return res.status(400).json({ error: 'Please provide a valid URL string.' });
      }

      const urlRes = await urlAnalyzer.analyze(url.trim());
      const categories = urlRes.indicators.length > 0 ? ['Malicious Link', 'Suspicious URL'] : ['Low-risk content'];
      if (urlRes.indicators.some(i => i.type === 'BRAND_IMPERSONATION')) {
        categories.push('Impersonation');
        categories.push('Phishing');
      }

      const report = await this._runPipeline({
        inputType: 'url',
        indicators: urlRes.indicators,
        categories: Array.from(new Set(categories)),
        rawContent: url,
        previewSnippet: url,
        metadata: {
          hostname: urlRes.hostname,
          isHttps: urlRes.isHttps,
          threatIntel: urlRes.threatIntel
        }
      });

      return res.json(report);
    } catch (err) {
      console.error('URL analysis failed:', err);
      return res.status(500).json({ error: 'Failed to analyze URL. ' + err.message });
    }
  }

  // POST /api/analyze/message
  async analyzeMessage(req, res) {
    try {
      const { content } = req.body;
      if (!content || typeof content !== 'string' || !content.trim()) {
        return res.status(400).json({ error: 'Please provide message content to analyze.' });
      }

      const msgRes = await messageAnalyzer.analyze(content.trim());
      const report = await this._runPipeline({
        inputType: 'message',
        indicators: msgRes.indicators,
        categories: msgRes.categories,
        rawContent: content,
        previewSnippet: content.slice(0, 100) + '...',
        metadata: {
          extractedUrls: msgRes.extractedUrls
        }
      });

      return res.json(report);
    } catch (err) {
      console.error('Message analysis failed:', err);
      return res.status(500).json({ error: 'Failed to analyze message: ' + err.message });
    }
  }

  // POST /api/analyze/email
  async analyzeEmail(req, res) {
    try {
      const { sender = '', subject = '', body = '', links = '' } = req.body;
      if (!body && !subject) {
        return res.status(400).json({ error: 'Please provide an email subject or body to analyze.' });
      }

      const emailRes = await emailAnalyzer.analyze({ sender, subject, body, links });
      const report = await this._runPipeline({
        inputType: 'email',
        indicators: emailRes.indicators,
        categories: emailRes.categories,
        rawContent: { sender, subject, body, links },
        previewSnippet: `From: ${sender || 'Unknown'} | Subj: ${subject || 'No subject'}`,
        metadata: {
          sender,
          subject,
          senderDomain: emailRes.senderDomain,
          extractedUrls: emailRes.extractedUrls
        }
      });

      return res.json(report);
    } catch (err) {
      console.error('Email analysis failed:', err);
      return res.status(500).json({ error: 'Failed to analyze email: ' + err.message });
    }
  }

  // POST /api/analyze/payment
  async analyzePayment(req, res) {
    try {
      const { amount, payee, note, linkOrVpa } = req.body;
      const combinedText = `Payment request of ₹${amount || ''} from ${payee || ''}. Note/Instructions: ${note || ''} ${linkOrVpa || ''}`;
      
      const msgRes = await messageAnalyzer.analyze(combinedText);
      const indicators = [...msgRes.indicators];
      const categories = new Set(msgRes.categories);
      categories.add('Payment Fraud');

      // Check specific payment deception flags
      const lowerText = combinedText.toLowerCase();
      if (
        lowerText.includes('receive') || 
        lowerText.includes('scan') || 
        lowerText.includes('pin') || 
        lowerText.includes('cashback') || 
        lowerText.includes('escrow')
      ) {
        if (lowerText.includes('pin') || lowerText.includes('scan qr') || lowerText.includes('scan') || lowerText.includes('receive')) {
          indicators.push({
            type: 'QR_PIN_RECEIVE_DECEPTION',
            severity: 'critical',
            score: 50,
            title: 'Critical UPI PIN Inversion Trap',
            evidence: note || 'Scan QR / Enter PIN to receive funds',
            explanation: 'Fraudsters claim scanning a QR code or entering your PIN will credit money. In reality, entering your PIN authorizes an immediate DEBIT from your bank account.'
          });
        }
      }

      const report = await this._runPipeline({
        inputType: 'payment',
        indicators,
        categories: Array.from(categories),
        rawContent: { amount, payee, note, linkOrVpa },
        previewSnippet: `Payee: ${payee || 'N/A'} | Amount: ₹${amount || '0'}`,
        metadata: { amount, payee, linkOrVpa }
      });

      return res.json(report);
    } catch (err) {
      console.error('Payment analysis failed:', err);
      return res.status(500).json({ error: 'Failed to analyze payment request: ' + err.message });
    }
  }

  // POST /api/analyze/screenshot (OCR)
  async analyzeScreenshot(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image file (PNG, JPG, JPEG, WEBP).' });
      }

      // 1. Run OCR
      const ocrResult = await ocrService.extractText(req.file.buffer || req.file.path);
      if (!ocrResult.success || !ocrResult.text.trim()) {
        return res.status(422).json({
          error: 'Could not extract readable text from the screenshot. Please ensure the screenshot is clear and contains visible text.',
          ocrConfidence: ocrResult.confidence
        });
      }

      const extractedText = ocrResult.text.trim();

      // 2. Run Message Analyzer on extracted text
      const msgRes = await messageAnalyzer.analyze(extractedText);
      const report = await this._runPipeline({
        inputType: 'screenshot',
        indicators: msgRes.indicators,
        categories: msgRes.categories,
        rawContent: extractedText,
        previewSnippet: extractedText.slice(0, 100) + '...',
        metadata: {
          ocrConfidence: Math.round(ocrResult.confidence),
          extractedText,
          extractedUrls: msgRes.extractedUrls,
          fileName: req.file.originalname
        }
      });

      return res.json({
        ...report,
        extractedText
      });
    } catch (err) {
      console.error('Screenshot OCR analysis failed:', err);
      return res.status(500).json({ error: 'Screenshot processing failed: ' + err.message });
    }
  }

  // GET /api/history
  getHistory(req, res) {
    const list = historyStore.getAll();
    res.json(list);
  }

  // GET /api/history/:id
  getHistoryById(req, res) {
    const item = historyStore.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Report not found' });
    res.json(item);
  }

  // DELETE /api/history/:id
  deleteHistoryItem(req, res) {
    const success = historyStore.deleteById(req.params.id);
    if (!success) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted successfully' });
  }

  // DELETE /api/history
  clearHistory(req, res) {
    historyStore.clearAll();
    res.json({ message: 'All analysis history cleared safely.' });
  }

  // POST /api/analyze/audio (Voice Call / Vishing / Digital Arrest Audio Transcript)
  async analyzeAudio(req, res) {
    try {
      const { transcript = '', callerName = '', callerNumber = '' } = req.body;
      if (!transcript.trim()) {
        return res.status(400).json({ error: 'Please provide phone call or voice transcript text.' });
      }

      const vishRes = await audioVishingAnalyzer.analyzeAudioTranscript(transcript, { callerName, callerNumber });
      const report = await this._runPipeline({
        inputType: 'voice',
        indicators: vishRes.indicators,
        categories: vishRes.categories,
        rawContent: { transcript, callerName, callerNumber },
        previewSnippet: `Call from: ${callerName || callerNumber || 'Unknown'} | "${transcript.slice(0, 80)}..."`,
        metadata: {
          callerName,
          callerNumber,
          audioSpecificFlags: vishRes.audioSpecificFlags
        }
      });

      return res.json(report);
    } catch (err) {
      console.error('Audio Vishing analysis failed:', err);
      return res.status(500).json({ error: 'Voice call analysis failed: ' + err.message });
    }
  }

  // GET /api/learning
  getLearning(req, res) {
    res.json({
      modules: LEARNING_MODULES,
      quiz: QUIZ_QUESTIONS,
      multilingual: MULTILANG_LEARNING
    });
  }

  // GET /api/demo
  getDemoExamples(req, res) {
    res.json(DEMO_EXAMPLES);
  }

  // POST /api/quiz/submit
  submitQuiz(req, res) {
    const { answers } = req.body; // { q1: 1, q2: 2, ... }
    let score = 0;
    const total = QUIZ_QUESTIONS.length;
    const review = [];

    QUIZ_QUESTIONS.forEach(q => {
      const selectedIdx = answers ? answers[q.id] : undefined;
      const correctIdx = q.options.findIndex(o => o.correct);
      const isCorrect = selectedIdx === correctIdx;
      if (isCorrect) score++;

      review.push({
        id: q.id,
        question: q.question,
        selectedOption: selectedIdx !== undefined ? q.options[selectedIdx]?.text : 'Unanswered',
        correctOption: q.options[correctIdx]?.text,
        isCorrect,
        reason: q.options[correctIdx]?.reason
      });
    });

    res.json({
      score,
      total,
      percentage: Math.round((score / total) * 100),
      review
    });
  }
}

export const analysisController = new AnalysisController();
