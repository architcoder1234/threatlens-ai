class RiskEngine {
  /**
   * Transparent rule-based risk calculation
   * Score range: 0 - 100
   * 0 - 20: LOW RISK
   * 21 - 50: MEDIUM RISK
   * 51 - 75: HIGH RISK
   * 76 - 100: CRITICAL RISK
   */
  calculateRisk({ indicators = [], categories = [] }) {
    let rawScore = 0;
    const scoreBreakdown = [];

    // Deduplicate indicators by title
    const uniqueIndicators = [];
    const seen = new Set();
    for (const ind of indicators) {
      if (!seen.has(ind.title)) {
        seen.add(ind.title);
        uniqueIndicators.push(ind);
      }
    }

    // Weight and accumulate scores
    for (const ind of uniqueIndicators) {
      let weight = ind.score || 15;
      
      // Fine-tune weights
      if (ind.severity === 'critical') weight = Math.max(weight, 25);
      else if (ind.severity === 'high') weight = Math.max(weight, 18);
      else if (ind.severity === 'medium') weight = Math.max(weight, 12);
      else weight = Math.max(weight, 8);

      rawScore += weight;
      scoreBreakdown.push({
        name: ind.title,
        points: `+${weight}`,
        evidence: ind.evidence,
        severity: ind.severity
      });
    }

    // Multi-indicator correlation multiplier (if multiple distinct threat categories trigger together, elevate risk)
    if (categories.length >= 2 && rawScore > 20) {
      const bonus = Math.min(categories.length * 6, 18);
      rawScore += bonus;
      scoreBreakdown.push({
        name: 'Multi-Vector Threat Correlation',
        points: `+${bonus}`,
        evidence: `Combination of ${categories.join(', ')} detected simultaneously`,
        severity: 'high'
      });
    }

    // Bound between 0 and 100
    const finalScore = Math.min(Math.max(rawScore, 0), 100);

    let riskLevel = 'LOW';
    let colorScheme = 'green';
    if (finalScore >= 76) {
      riskLevel = 'CRITICAL';
      colorScheme = 'red';
    } else if (finalScore >= 51) {
      riskLevel = 'HIGH';
      colorScheme = 'orange';
    } else if (finalScore >= 21) {
      riskLevel = 'MEDIUM';
      colorScheme = 'amber';
    }

    return {
      riskScore: finalScore,
      riskLevel,
      colorScheme,
      scoreBreakdown,
      uniqueIndicators
    };
  }
}

export const riskEngine = new RiskEngine();
