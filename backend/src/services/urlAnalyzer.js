import { threatIntelService } from './threatIntelService.js';
import { TARGET_BRANDS, SUSPICIOUS_DOMAINS } from '../data/threatPatterns.js';

class UrlAnalyzer {
  /**
   * Extract all URLs from a text block
   */
  extractUrls(text) {
    if (!text) return [];
    // Match http/https URLs and naked domains like example.com/path
    const urlRegex = /(https?:\/\/[^\s<>"'{}|\\^`]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s<>"'{}|\\^`]*)?)/gi;
    const matches = text.match(urlRegex) || [];
    
    // Clean and filter matches
    return matches.map(raw => {
      let cleaned = raw.trim().replace(/[.,;:)\]]+$/, '');
      if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
        // If it looks like a domain or email domain, format as http for parsing
        if (cleaned.includes('@')) {
          cleaned = cleaned.split('@')[1];
        }
        cleaned = 'https://' + cleaned;
      }
      return cleaned;
    }).filter(u => {
      try {
        const parsed = new URL(u);
        return parsed.hostname && parsed.hostname.includes('.');
      } catch {
        return false;
      }
    });
  }

  /**
   * Deep analysis of a specific URL
   */
  async analyze(rawUrl) {
    let targetUrl = rawUrl.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'http://' + targetUrl;
    }

    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch (e) {
      return {
        isValid: false,
        error: 'Invalid URL format',
        indicators: [],
        riskContribution: 20
      };
    }

    const hostname = parsed.hostname.toLowerCase();
    const protocol = parsed.protocol.toLowerCase();
    const pathname = parsed.pathname;
    const indicators = [];
    let riskContribution = 0;

    // 1. HTTPS Presence
    const isHttps = protocol === 'https:';
    if (!isHttps) {
      indicators.push({
        type: 'UNENCRYPTED_CONNECTION',
        severity: 'medium',
        score: 15,
        title: 'Unencrypted Connection (HTTP)',
        evidence: `Protocol used: "${protocol}" instead of "https:"`,
        explanation: 'Data entered on unencrypted HTTP websites can be intercepted by attackers on public or compromised networks.'
      });
      riskContribution += 15;
    }

    // 2. IP Address as Host
    const isIpHost = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.startsWith('[');
    if (isIpHost) {
      indicators.push({
        type: 'IP_ADDRESS_HOST',
        severity: 'high',
        score: 25,
        title: 'Direct IP Address Host',
        evidence: `Hostname: "${hostname}"`,
        explanation: 'Legitimate services use registered domain names. Direct IP addresses are commonly used to bypass domain reputation blocklists.'
      });
      riskContribution += 25;
    }

    // 3. Excessive subdomains or deep nesting
    const domainParts = hostname.split('.');
    if (domainParts.length > 3 && !isIpHost) {
      indicators.push({
        type: 'EXCESSIVE_SUBDOMAINS',
        severity: 'medium',
        score: 15,
        title: 'Excessive Subdomain Nesting',
        evidence: `Hostname contains ${domainParts.length} parts: "${hostname}"`,
        explanation: 'Attackers frequently nest recognizable brand names inside deep subdomains (e.g. "brand.com.evil-site.xyz") to trick mobile users who only see the start of the URL.'
      });
      riskContribution += 15;
    }

    // 4. Look-alike Brand Impersonation in domain
    let brandDetected = null;
    for (const brand of TARGET_BRANDS) {
      for (const kw of brand.keywords) {
        if (hostname.includes(kw)) {
          // Check if it's the actual genuine domain
          const isGenuine = ['google.com', 'microsoft.com', 'apple.com', 'paypal.com', 'amazon.com', 'netflix.com', 'sbi.co.in', 'onlinesbi.sbi', 'paytm.com', 'whatsapp.com', 'indiapost.gov.in'].some(d => hostname === d || hostname.endsWith(`.${d}`));
          if (!isGenuine) {
            brandDetected = brand.name;
            indicators.push({
              type: 'BRAND_IMPERSONATION',
              severity: 'critical',
              score: 25,
              title: `Look-alike Brand Impersonation (${brand.name})`,
              evidence: `Domain "${hostname}" includes brand keyword "${kw}" without being the official domain`,
              explanation: `The link attempts to mimic ${brand.name}. Real ${brand.name} services will never use unauthorized domains.`
            });
            riskContribution += 25;
            break;
          }
        }
      }
      if (brandDetected) break;
    }

    // 5. Suspicious TLD / Suffix check
    for (const tld of SUSPICIOUS_DOMAINS) {
      if (hostname.endsWith(`.${tld}`)) {
        indicators.push({
          type: 'SUSPICIOUS_TLD',
          severity: 'high',
          score: 20,
          title: `High-Risk Top-Level Domain (.${tld})`,
          evidence: `Domain ends with ".${tld}"`,
          explanation: `Top-level domains like .${tld} are frequently used for disposable phishing campaigns because of low registration barriers.`
        });
        riskContribution += 20;
        break;
      }
    }

    // 6. Suspicious characters / Homograph attacks / Symbols in host
    if (hostname.includes('-') && (hostname.includes('login') || hostname.includes('verify') || hostname.includes('account') || hostname.includes('security'))) {
      indicators.push({
        type: 'SECURITY_KEYWORD_HYPHENATION',
        severity: 'high',
        score: 18,
        title: 'Suspicious Security Keyword in Domain',
        evidence: `Hostname: "${hostname}" contains deceptive security keywords`,
        explanation: 'Phishing URLs often combine hyphens with words like "login", "verify", or "security" to manufacture artificial authenticity.'
      });
      riskContribution += 18;
    }

    // 7. URL Length Anomaly
    if (targetUrl.length > 100) {
      indicators.push({
        type: 'ANOMALOUS_URL_LENGTH',
        severity: 'low',
        score: 8,
        title: 'Unusually Long URL Structure',
        evidence: `URL length: ${targetUrl.length} characters`,
        explanation: 'Extremely long URLs with dense query strings may attempt to obscure the destination or pack tracking/exploit payloads.'
      });
      riskContribution += 8;
    }

    // 8. Query Threat Intel Service
    const threatIntel = await threatIntelService.checkReputation(targetUrl, hostname);
    if (threatIntel.flagged) {
      threatIntel.flags.forEach(flag => {
        indicators.push({
          type: 'THREAT_INTEL_MATCH',
          severity: 'high',
          score: 20,
          title: 'Threat Intelligence Alert',
          evidence: flag,
          explanation: 'External threat feeds or local reputation engine confirmed malicious association.'
        });
      });
      riskContribution += Math.min(threatIntel.reputationScore, 35);
    }

    return {
      isValid: true,
      url: targetUrl,
      hostname,
      isHttps,
      indicators,
      riskContribution,
      threatIntel
    };
  }
}

export const urlAnalyzer = new UrlAnalyzer();
