import axios from 'axios';
import { SUSPICIOUS_DOMAINS, TARGET_BRANDS } from '../data/threatPatterns.js';

class ThreatIntelService {
  /**
   * Check reputation of a domain or URL
   * Works fully offline via heuristic intelligence databases and optionally queries external APIs if configured
   */
  async checkReputation(targetUrl, domain) {
    const result = {
      reputationScore: 0, // 0 is clean/unknown, > 0 indicates risk
      flagged: false,
      sourcesChecked: ['Local Threat Heuristics Database'],
      flags: [],
      details: {}
    };

    if (!domain) return result;

    const lowerDomain = domain.toLowerCase();

    // 1. Check suspicious top-level domains (TLDs)
    for (const tld of SUSPICIOUS_DOMAINS) {
      if (lowerDomain.endsWith(`.${tld}`) || lowerDomain.includes(`.${tld}/`)) {
        result.reputationScore += 25;
        result.flagged = true;
        result.flags.push(`Suspicious/Abuse-prone top-level domain (.${tld})`);
      }
    }

    // 2. Check for brand keyword stuffing in non-official domains
    for (const brand of TARGET_BRANDS) {
      for (const kw of brand.keywords) {
        if (lowerDomain.includes(kw)) {
          // Check if it's the genuine official domain
          const officialDomains = [
            'google.com', 'microsoft.com', 'apple.com', 'paypal.com', 'amazon.com',
            'netflix.com', 'sbi.co.in', 'onlinesbi.sbi', 'hdfcbank.com', 'icicibank.com',
            'paytm.com', 'indiapost.gov.in', 'incometax.gov.in', 'whatsapp.com'
          ];
          const isOfficial = officialDomains.some(od => lowerDomain === od || lowerDomain.endsWith(`.${od}`));
          
          if (!isOfficial) {
            result.reputationScore += 35;
            result.flagged = true;
            result.flags.push(`Look-alike brand impersonation target: "${brand.name}" in unverified domain "${domain}"`);
          }
        }
      }
    }

    // 3. Optional external API integration: VirusTotal (Gracefully falls back if key is missing or rate limited)
    if (process.env.VIRUSTOTAL_API_KEY) {
      try {
        result.sourcesChecked.push('VirusTotal v3 API');
        // Encode URL to VT format if querying full URL
        const urlId = Buffer.from(targetUrl).toString('base64').replace(/=/g, '');
        const vtResponse = await axios.get(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
          headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY },
          timeout: 2500
        });
        
        const stats = vtResponse.data?.data?.attributes?.last_analysis_stats;
        if (stats && stats.malicious > 0) {
          result.reputationScore += stats.malicious * 15;
          result.flagged = true;
          result.flags.push(`VirusTotal: Flagged malicious by ${stats.malicious} security vendors`);
        }
      } catch (err) {
        // Graceful silent fallback
        result.details.vtError = 'External threat intelligence provider query skipped or timed out';
      }
    }

    // 4. Optional Google Safe Browsing API check
    if (process.env.GOOGLE_SAFE_BROWSING_KEY) {
      try {
        result.sourcesChecked.push('Google Safe Browsing');
        const gsbUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`;
        const gsbBody = {
          client: { clientId: 'threatlens-ai', clientVersion: '1.0.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url: targetUrl }]
          }
        };
        const gsbRes = await axios.post(gsbUrl, gsbBody, { timeout: 2500 });
        if (gsbRes.data?.matches?.length > 0) {
          result.reputationScore += 45;
          result.flagged = true;
          result.flags.push(`Google Safe Browsing: URL match found in global phishing/threat index`);
        }
      } catch (err) {
        result.details.gsbError = 'Safe Browsing query skipped';
      }
    }

    return result;
  }
}

export const threatIntelService = new ThreatIntelService();
