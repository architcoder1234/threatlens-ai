import { messageAnalyzer } from './messageAnalyzer.js';

class AudioVishingAnalyzer {
  /**
   * Analyze phone call transcript, automated robocall speech, or simulated voice scam
   */
  async analyzeAudioTranscript(transcriptText, callerInfo = {}) {
    const text = (transcriptText || '').trim();
    if (!text) {
      return {
        indicators: [],
        categories: [],
        riskContribution: 0,
        audioSpecificFlags: []
      };
    }

    const lower = text.toLowerCase();
    const indicators = [];
    const categories = new Set();
    const audioSpecificFlags = [];
    let riskContribution = 0;

    categories.add('Vishing');
    categories.add('Social Engineering');

    // 1. Police / Arrest / Customs Intimidation
    if (lower.includes('police') || lower.includes('arrest') || lower.includes('customs') || lower.includes('parcel contraband') || lower.includes('narcotics') || lower.includes('digital arrest') || lower.includes('cbi') || lower.includes('court order')) {
      indicators.push({
        type: 'LAW_ENFORCEMENT_INTIMIDATION',
        severity: 'critical',
        score: 30,
        title: 'High-Pressure "Digital Arrest" / Police Intimidation',
        evidence: 'Caller claims law enforcement authority or legal warrant over phone call',
        explanation: 'Real law enforcement agencies and courts NEVER conduct interrogations or place citizens under "digital arrest" via WhatsApp or telephone.'
      });
      categories.add('Impersonation');
      audioSpecificFlags.push('Fake Law Enforcement / Digital Arrest Intimidation');
      riskContribution += 30;
    }

    // 2. Secret Skype / Video Call Demands
    if (lower.includes('skype') || lower.includes('keep this secret') || lower.includes('do not disconnect') || lower.includes('stay on call') || lower.includes('isolated room')) {
      indicators.push({
        type: 'ISOLATION_COERCION',
        severity: 'critical',
        score: 25,
        title: 'Victim Psychological Isolation Tactic',
        evidence: 'Caller demands you remain on call in isolation without consulting family',
        explanation: 'Scammers demand continuous call connection and total secrecy to prevent victims from getting second opinions from family or banks.'
      });
      audioSpecificFlags.push('Victim Isolation / Secrecy Pressure');
      riskContribution += 25;
    }

    // 3. Remote Desktop / AnyDesk / TeamViewer Request
    if (lower.includes('anydesk') || lower.includes('teamviewer') || lower.includes('quicksupport') || lower.includes('rustdesk') || lower.includes('download remote app')) {
      indicators.push({
        type: 'REMOTE_ACCESS_EXPLOIT',
        severity: 'critical',
        score: 30,
        title: 'Remote Screen-Sharing / Device Takeover Solicitation',
        evidence: 'Caller asks to install remote desktop tools (AnyDesk/TeamViewer)',
        explanation: 'Installing remote desktop apps allows cybercriminals to view your screen, capture OTPs in real-time, and control your device remotely.'
      });
      categories.add('Credential Theft');
      audioSpecificFlags.push('Remote Device Control Solicitation');
      riskContribution += 30;
    }

    // 4. Run General Message Analyzer on Call Transcript
    const msgRes = await messageAnalyzer.analyze(text);
    msgRes.indicators.forEach(ind => indicators.push(ind));
    msgRes.categories.forEach(cat => categories.add(cat));
    riskContribution += msgRes.riskContribution;

    return {
      transcript: text,
      callerInfo,
      indicators,
      categories: Array.from(categories),
      riskContribution,
      audioSpecificFlags
    };
  }
}

export const audioVishingAnalyzer = new AudioVishingAnalyzer();
