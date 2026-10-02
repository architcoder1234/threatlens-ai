import { messageAnalyzer } from './messageAnalyzer.js';
import { urlAnalyzer } from './urlAnalyzer.js';
import { TARGET_BRANDS } from '../data/threatPatterns.js';

class EmailAnalyzer {
  /**
   * Analyze email components: sender, subject, body, links
   */
  async analyze({ sender = '', subject = '', body = '', links = '' }) {
    const indicators = [];
    const categories = new Set();
    let riskContribution = 0;

    const fullContent = `${subject} \n ${body}`;
    const lowerSender = (sender || '').toLowerCase();
    const lowerSubject = (subject || '').toLowerCase();

    // 1. Sender & Domain Mismatch / Free Email Provider Check
    const emailMatch = lowerSender.match(/<([^>]+)>|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const senderEmail = emailMatch ? (emailMatch[1] || emailMatch[2]) : lowerSender;
    const senderDomain = senderEmail.includes('@') ? senderEmail.split('@')[1] : '';

    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.ru', 'protonmail.com', 'aol.com'];
    
    // Check if sender display name claims to be a brand/executive but uses free provider
    let claimedBrand = null;
    for (const brand of TARGET_BRANDS) {
      if (lowerSender.includes(brand.name.toLowerCase()) || brand.keywords.some(k => lowerSender.includes(k))) {
        claimedBrand = brand.name;
        break;
      }
    }
    if (lowerSender.includes('ceo') || lowerSender.includes('executive') || lowerSender.includes('support') || lowerSender.includes('security') || lowerSender.includes('billing')) {
      if (!claimedBrand) claimedBrand = 'Executive / Official Dept';
    }

    if (claimedBrand && freeProviders.includes(senderDomain)) {
      indicators.push({
        type: 'SENDER_DOMAIN_MISMATCH',
        severity: 'critical',
        score: 25,
        title: 'Executive / Brand Impersonation via Public Mailbox',
        evidence: `Sender "${sender}" claims authority but uses public email provider "@${senderDomain}"`,
        explanation: 'Legitimate corporate representatives and support teams communicate through their company domain, not free public webmail accounts.'
      });
      categories.add('Impersonation');
      categories.add('Phishing');
      riskContribution += 25;
    }

    // 2. Subject Line Urgency / Threat Analysis
    if (lowerSubject.includes('urgent') || lowerSubject.includes('action required') || lowerSubject.includes('immediate') || lowerSubject.includes('important') || lowerSubject.includes('suspended')) {
      indicators.push({
        type: 'SUBJECT_PRESSURE',
        severity: 'medium',
        score: 15,
        title: 'High-Pressure Subject Line',
        evidence: `Subject: "${subject}"`,
        explanation: 'Subject lines designed to cause alarm are engineered to bypass security deliberation.'
      });
      riskContribution += 15;
      categories.add('Social Engineering');
    }

    // 3. Run Message Analyzer on Email Body + Subject
    const msgResult = await messageAnalyzer.analyze(fullContent);
    msgResult.indicators.forEach(ind => indicators.push(ind));
    msgResult.categories.forEach(cat => categories.add(cat));
    riskContribution += msgResult.riskContribution;

    // 4. Analyze explicitly provided links field if present
    if (links) {
      const extractedExplicit = urlAnalyzer.extractUrls(links);
      for (const u of extractedExplicit) {
        const uRes = await urlAnalyzer.analyze(u);
        if (uRes.indicators.length > 0) {
          categories.add('Malicious Link');
          uRes.indicators.forEach(uInd => {
            indicators.push({
              ...uInd,
              title: `[Email Link] ${uInd.title}`,
              evidence: `${uInd.evidence} (${u})`
            });
          });
          riskContribution += uRes.riskContribution;
        }
      }
    }

    return {
      sender,
      subject,
      senderDomain,
      indicators,
      categories: Array.from(categories),
      riskContribution,
      extractedUrls: msgResult.extractedUrls
    };
  }
}

export const emailAnalyzer = new EmailAnalyzer();
