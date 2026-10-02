import axios from 'axios';

class AIService {
  /**
   * Generates natural language threat explanation and educational takeaway.
   * If an LLM API key (Gemini / OpenAI) is configured, it leverages AI reasoning;
   * otherwise, it dynamically synthesizes rich contextual deterministic reasoning.
   */
  async generateExplanation({ inputType, indicators, rawContent, riskScore, riskLevel, categories }) {
    // 1. Check for OpenAI or Gemini API keys
    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are ThreatLens AI, a digital cybersecurity threat analyzer.
Analyze this suspicious ${inputType} input.
Input: ${JSON.stringify(rawContent)}
Detected Rule Indicators: ${JSON.stringify(indicators)}
Risk Score: ${riskScore}/100 (${riskLevel})
Threat Categories: ${categories.join(', ')}

Provide a structured, easy-to-understand explanation for ordinary users in JSON format with:
- "summary": 2 concise sentences explaining what the threat is and why it's dangerous.
- "whySuspiciousSummary": 2-3 key bullet points in simple language.
- "learningInsight": A practical educational tip on how to recognize this pattern next time.
Return ONLY valid JSON.`;

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          },
          { timeout: 4000 }
        );

        const textOutput = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          return JSON.parse(textOutput);
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local synthesis engine:', err.message);
      }
    }

    // Deterministic fallback synthesis engine
    return this.synthesizeLocalExplanation({ inputType, indicators, riskScore, riskLevel, categories });
  }

  synthesizeLocalExplanation({ inputType, indicators, riskScore, riskLevel, categories }) {
    if (riskScore <= 20) {
      return {
        summary: 'No strong threat indicators or malicious patterns were detected in this content based on analytical security heuristics.',
        whySuspiciousSummary: [
          'No known malicious URLs, high-pressure urgency cues, or credential harvesting triggers were identified.',
          'Standard communication patterns observed without anomalous structural defects.'
        ],
        learningInsight: 'Remember that sophisticated attacks can sometimes appear benign initially. Always confirm sensitive transactions through verified channels.'
      };
    }

    const catStr = categories.join(' and ');
    const highSeverityInds = indicators.filter(i => i.severity === 'critical' || i.severity === 'high');
    const mainEvidence = highSeverityInds.length > 0 
      ? highSeverityInds.map(i => i.explanation).join(' ')
      : 'Suspicious formatting and psychological triggers were detected.';

    return {
      summary: `This ${inputType} exhibits high-risk indicators associated with ${catStr || 'digital fraud'}. ${mainEvidence}`,
      whySuspiciousSummary: indicators.slice(0, 4).map(i => `${i.title}: ${i.explanation}`),
      learningInsight: indicators.some(i => i.type?.includes('URGENCY'))
        ? 'Urgency manipulation is the number one weapon of digital scammers. When a message threatens account closure within minutes or hours, it is almost certainly fraudulent.'
        : indicators.some(i => i.type?.includes('CREDENTIAL'))
        ? 'Legitimate organizations already possess your verified account credentials. Any unsolicited request asking for passwords, OTPs, or PINs is an immediate red flag.'
        : 'Always inspect the exact spelling and domain extension in URLs before clicking or providing information.'
    };
  }
}

export const aiService = new AIService();
