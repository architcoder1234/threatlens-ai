import { 
  URGENCY_TRIGGERS, 
  ACCOUNT_THREAT_TRIGGERS, 
  CREDENTIAL_TRIGGERS, 
  FINANCIAL_TRIGGERS,
  PAYMENT_FRAUD_PATTERNS,
  TARGET_BRANDS 
} from '../data/threatPatterns.js';
import { urlAnalyzer } from './urlAnalyzer.js';

class MessageAnalyzer {
  /**
   * Analyze raw message or SMS content for social engineering & psychological manipulation
   */
  async analyze(content) {
    if (!content || typeof content !== 'string') {
      return {
        indicators: [],
        categories: [],
        riskContribution: 0,
        extractedUrls: [],
        urlAnalyses: []
      };
    }

    const text = content.toLowerCase();
    const indicators = [];
    const categories = new Set();
    let riskContribution = 0;

    // 1. Urgency Manipulation Detection
    const foundUrgency = URGENCY_TRIGGERS.filter(trigger => text.includes(trigger.toLowerCase()));
    if (foundUrgency.length > 0) {
      indicators.push({
        type: 'URGENCY_MANIPULATION',
        severity: 'high',
        score: 20,
        title: 'Urgency & Pressure Tactics',
        evidence: `Contains urgent triggers: "${foundUrgency.slice(0, 3).join('", "')}"`,
        explanation: 'The message creates an artificial rush to coerce you into acting quickly without independent verification.'
      });
      categories.add('Social Engineering');
      riskContribution += 20;
    }

    // 2. Account Suspension & Threat Language
    const foundAccountThreats = ACCOUNT_THREAT_TRIGGERS.filter(trigger => text.includes(trigger.toLowerCase()));
    if (foundAccountThreats.length > 0) {
      indicators.push({
        type: 'ACCOUNT_THREAT_FEAR',
        severity: 'high',
        score: 22,
        title: 'Account Block or Threat Coercion',
        evidence: `Threatens with: "${foundAccountThreats.slice(0, 3).join('", "')}"`,
        explanation: 'Scammers exploit fear of account loss or legal trouble to force immediate compliance.'
      });
      categories.add('Phishing');
      riskContribution += 22;
    }

    // 3. Credential / Sensitive Information Request
    const foundCredentials = CREDENTIAL_TRIGGERS.filter(trigger => text.includes(trigger.toLowerCase()));
    if (foundCredentials.length > 0) {
      indicators.push({
        type: 'CREDENTIAL_REQUEST',
        severity: 'critical',
        score: 25,
        title: 'Credential / OTP Solicitation',
        evidence: `Requests sensitive data: "${foundCredentials.slice(0, 3).join('", "')}"`,
        explanation: 'Legitimate organizations never ask for your passwords, OTP codes, or PINs over SMS or chat.'
      });
      categories.add('Credential Theft');
      riskContribution += 25;
    }

    // 4. Financial Scam / Lottery / Free Cash Triggers
    const foundFinancial = FINANCIAL_TRIGGERS.filter(trigger => text.includes(trigger.toLowerCase()));
    if (foundFinancial.length > 0) {
      indicators.push({
        type: 'FINANCIAL_PROMISE_SCAM',
        severity: 'high',
        score: 20,
        title: 'Unrealistic Financial Promise / Prize Claim',
        evidence: `Financial keywords: "${foundFinancial.slice(0, 3).join('", "')}"`,
        explanation: 'Promises of unsolicited lottery wins, instant loans, or free funds are hallmarks of advance-fee fraud.'
      });
      categories.add('Scam');
      riskContribution += 20;
    }

    // 5. Payment Fraud Patterns (Reverse charges, QR to receive money)
    const foundPaymentFraud = PAYMENT_FRAUD_PATTERNS.filter(pattern => text.includes(pattern.toLowerCase()));
    if (foundPaymentFraud.length > 0) {
      indicators.push({
        type: 'PAYMENT_FRAUD_TRICK',
        severity: 'critical',
        score: 28,
        title: 'Payment Reversal / UPI Receiving Trap',
        evidence: `Pattern detected: "${foundPaymentFraud[0]}"`,
        explanation: 'Crucial Rule: You NEVER need to enter a PIN or scan a QR code to receive money on UPI or banking apps.'
      });
      categories.add('Payment Fraud');
      riskContribution += 28;
    }

    // 6. Brand Impersonation in text
    for (const brand of TARGET_BRANDS) {
      if (brand.keywords.some(kw => text.includes(kw))) {
        categories.add('Impersonation');
        // If combined with urgency or credential requests, flag brand imitation
        if (foundUrgency.length > 0 || foundAccountThreats.length > 0 || foundCredentials.length > 0) {
          indicators.push({
            type: 'BRAND_IMPERSONATION_TEXT',
            severity: 'high',
            score: 18,
            title: `Impersonation of ${brand.name}`,
            evidence: `Mentions "${brand.name}" in combination with coercive demands`,
            explanation: `Attackers imitate authoritative institutions like ${brand.name} to establish unearned trust.`
          });
          riskContribution += 18;
          break;
        }
      }
    }

    // 7. URL Extraction and embedded URL analysis
    const extractedUrls = urlAnalyzer.extractUrls(content);
    const urlAnalyses = [];
    
    for (const url of extractedUrls) {
      const uRes = await urlAnalyzer.analyze(url);
      urlAnalyses.push(uRes);
      if (uRes.indicators.length > 0) {
        categories.add('Malicious Link');
        uRes.indicators.forEach(uInd => {
          indicators.push({
            ...uInd,
            title: `[Link Alert] ${uInd.title}`,
            evidence: `${uInd.evidence} (in link: ${url})`
          });
        });
        riskContribution += uRes.riskContribution;
      }
    }

    if (categories.size === 0 && indicators.length === 0) {
      categories.add('Low-risk content');
    }

    return {
      indicators,
      categories: Array.from(categories),
      riskContribution,
      extractedUrls,
      urlAnalyses
    };
  }
}

export const messageAnalyzer = new MessageAnalyzer();
