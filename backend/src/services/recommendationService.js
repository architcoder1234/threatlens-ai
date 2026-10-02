class RecommendationService {
  /**
   * Produce targeted, actionable safety recommendations based on risk score and specific threat indicators
   */
  generateRecommendations({ riskScore, riskLevel, indicators = [], categories = [] }) {
    const doNots = [];
    const dos = [];
    const educationalTakeaways = [];

    // Low Risk
    if (riskScore <= 20) {
      dos.push('Continue with normal caution. Ensure you are familiar with the sender.');
      dos.push('Always confirm the official domain name in your browser address bar before entering credentials.');
      return {
        doNots,
        dos,
        educationalTakeaways: [
          'Even when content appears low risk, remember that legitimate services will never ask for your secret passwords or OTPs directly.'
        ],
        summary: 'No strong threat indicators detected based on the available information.'
      };
    }

    // High & Critical Risk
    if (riskScore >= 51) {
      doNots.push('Do NOT click any links, open attachments, or download files.');
      doNots.push('Do NOT share OTPs, PINs, passwords, or personal identity details.');
      doNots.push('Do NOT transfer money or scan QR codes under pressure.');
      
      dos.push('Verify independently by opening the official company app or typing their authentic website URL manually.');
      dos.push('Block and report the sender on your messaging platform or email client.');
      dos.push('If you already entered credentials, immediately change your passwords and contact your bank or service provider.');
    } else {
      // Medium Risk (21 - 50)
      doNots.push('Do NOT input login credentials or financial data on the provided link.');
      doNots.push('Avoid making hasty payments or acting on unverified deadlines.');

      dos.push('Independently verify the sender\'s identity using trusted contact details from an official invoice or verified website.');
      dos.push('Inspect the root domain carefully before interacting.');
    }

    // Specific Indicator Recommendations
    const hasCreds = indicators.some(i => i.type?.includes('CREDENTIAL'));
    const hasPayment = indicators.some(i => i.type?.includes('PAYMENT') || i.type?.includes('FINANCIAL'));
    const hasImpersonation = indicators.some(i => i.type?.includes('IMPERSONATION') || i.type?.includes('SENDER'));
    const hasUrgency = indicators.some(i => i.type?.includes('URGENCY') || i.type?.includes('PRESSURE'));

    if (hasCreds) {
      educationalTakeaways.push('Zero-Trust on OTPs: Legitimate tech support or bank staff will NEVER ask you to read back a verification code.');
    }
    if (hasPayment) {
      educationalTakeaways.push('UPI Receiving Rule: Receiving money into your account NEVER requires scanning a QR code or entering your PIN.');
    }
    if (hasImpersonation) {
      educationalTakeaways.push('Domain Verification: Always check the root domain ending rather than relying on the display name or subdomain.');
    }
    if (hasUrgency) {
      educationalTakeaways.push('Emotional Pause: Artificial deadlines are engineered to induce panic and bypass logic. Always pause and verify.');
    }

    return {
      doNots: Array.from(new Set(doNots)),
      dos: Array.from(new Set(dos)),
      educationalTakeaways: Array.from(new Set(educationalTakeaways)),
      summary: riskScore >= 76 
        ? 'CRITICAL THREAT: Strong evidence of malicious intent detected. Cease all interaction immediately.'
        : riskScore >= 51
        ? 'HIGH THREAT: High likelihood of phishing, impersonation, or financial scam. Proceed with extreme caution.'
        : 'POTENTIAL RISK: Suspicious patterns observed. Independent verification required.'
    };
  }
}

export const recommendationService = new RecommendationService();
