const API_BASE = '/api';

export const threatApi = {
  // Analyze URL
  async analyzeUrl(url) {
    const res = await fetch(`${API_BASE}/analyze/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Analysis failed' }));
      throw new Error(err.error || 'Server error during URL analysis');
    }
    return res.json();
  },

  // Analyze Message / SMS / WhatsApp
  async analyzeMessage(content) {
    const res = await fetch(`${API_BASE}/analyze/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Analysis failed' }));
      throw new Error(err.error || 'Server error during message analysis');
    }
    return res.json();
  },

  // Analyze Email
  async analyzeEmail(emailData) {
    const res = await fetch(`${API_BASE}/analyze/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Analysis failed' }));
      throw new Error(err.error || 'Server error during email analysis');
    }
    return res.json();
  },

  // Analyze Payment
  async analyzePayment(paymentData) {
    const res = await fetch(`${API_BASE}/analyze/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Analysis failed' }));
      throw new Error(err.error || 'Server error during payment analysis');
    }
    return res.json();
  },

  // Analyze Voice Call / Vishing
  async analyzeAudio(audioData) {
    const res = await fetch(`${API_BASE}/analyze/audio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audioData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Analysis failed' }));
      throw new Error(err.error || 'Server error during voice analysis');
    }
    return res.json();
  },

  // Analyze Screenshot (OCR)
  async analyzeScreenshot(file) {
    const formData = new FormData();
    formData.append('screenshot', file);

    const res = await fetch(`${API_BASE}/analyze/screenshot`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'OCR Analysis failed' }));
      throw new Error(err.error || 'Failed to process screenshot');
    }
    return res.json();
  },

  // History APIs
  async getHistory() {
    const res = await fetch(`${API_BASE}/history`);
    if (!res.ok) throw new Error('Failed to load history');
    return res.json();
  },

  async getHistoryById(id) {
    const res = await fetch(`${API_BASE}/history/${id}`);
    if (!res.ok) throw new Error('Failed to fetch report');
    return res.json();
  },

  async deleteHistory(id) {
    const res = await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete report');
    return res.json();
  },

  async clearHistory() {
    const res = await fetch(`${API_BASE}/history`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear history');
    return res.json();
  },

  // Learning & Demo
  async getLearning() {
    const res = await fetch(`${API_BASE}/learning`);
    if (!res.ok) throw new Error('Failed to fetch learning content');
    return res.json();
  },

  async getDemoExamples() {
    const res = await fetch(`${API_BASE}/demo`);
    if (!res.ok) throw new Error('Failed to fetch demo data');
    return res.json();
  },

  async submitQuiz(answers) {
    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    if (!res.ok) throw new Error('Failed to submit quiz');
    return res.json();
  }
};
