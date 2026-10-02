import { createWorker } from 'tesseract.js';
import fs from 'fs';

class OcrService {
  /**
   * Extract textual content from uploaded image buffer or filepath
   */
  async extractText(imagePathOrBuffer) {
    let worker = null;
    try {
      worker = await createWorker('eng');
      const ret = await worker.recognize(imagePathOrBuffer);
      await worker.terminate();

      const text = ret.data.text ? ret.data.text.trim() : '';
      const confidence = ret.data.confidence || 0;

      return {
        success: true,
        text,
        confidence,
        linesCount: ret.data.lines ? ret.data.lines.length : 0
      };
    } catch (error) {
      if (worker) {
        try { await worker.terminate(); } catch (e) {}
      }
      console.error('OCR processing error:', error.message);
      return {
        success: false,
        text: '',
        confidence: 0,
        error: 'Failed to extract text from image. Please ensure the image is clear and readable.'
      };
    }
  }
}

export const ocrService = new OcrService();
