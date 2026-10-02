import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  ArrowLeft, 
  Share2, 
  Download, 
  ExternalLink,
  Info,
  HelpCircle,
  Clock,
  Key,
  CreditCard,
  Flame
} from 'lucide-react';

export default function Results({ report, onBackToAnalyze, onGoToLearn }) {
  const [copied, setCopied] = React.useState(false);

  if (!report) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400">No active threat analysis report loaded.</p>
        <button
          onClick={onBackToAnalyze}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm cursor-pointer"
        >
          Analyze New Content
        </button>
      </div>
    );
  }

  const {
    riskScore = 0,
    riskLevel = 'LOW',
    colorScheme = 'green',
    categories = [],
    whySuspicious = [],
    evidence = [],
    recommendations = { dos: [], doNots: [], educationalTakeaways: [], summary: '' },
    explanation = '',
    learningInsight = '',
    scoreBreakdown = [],
    metadata = {},
    extractedText,
    inputType = 'content'
  } = report;

  const handleCopySummary = () => {
    const textToCopy = `🛡️ ThreatLens AI Threat Report
• Risk Index: ${riskScore}/100 (${riskLevel})
• Categories: ${categories.join(', ')}
• Summary: ${explanation}
• Action: ${recommendations.summary}
Analyzed via: https://threatlens-ai-60k2.onrender.com`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Determine badge styling
  const getRiskBadge = () => {
    if (riskScore >= 76) {
      return {
        bg: 'bg-red-950/80 border-red-500/50 text-red-400',
        barBg: 'from-orange-500 to-red-600',
        icon: ShieldAlert,
        glow: 'shadow-red-500/20'
      };
    }
    if (riskScore >= 51) {
      return {
        bg: 'bg-orange-950/80 border-orange-500/50 text-orange-400',
        barBg: 'from-amber-500 to-orange-600',
        icon: AlertTriangle,
        glow: 'shadow-orange-500/20'
      };
    }
    if (riskScore >= 21) {
      return {
        bg: 'bg-amber-950/80 border-amber-500/50 text-amber-400',
        barBg: 'from-yellow-400 to-amber-500',
        icon: AlertTriangle,
        glow: 'shadow-amber-500/20'
      };
    }
    return {
      bg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400',
      barBg: 'from-emerald-400 to-teal-500',
      icon: ShieldCheck,
      glow: 'shadow-emerald-500/20'
    };
  };

  const badge = getRiskBadge();
  const RiskIcon = badge.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBackToAnalyze}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors cursor-pointer"
            title="Copy Report Brief to Clipboard"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Share Threat Brief'}</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors cursor-pointer"
            title="Download or Print PDF Report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export / Print PDF</span>
          </button>
        </div>
      </div>

      {/* 1. MAIN THREAT REPORT HERO HEADER */}
      <div className={`relative overflow-hidden rounded-3xl p-8 border bg-slate-900/90 ${badge.bg} shadow-2xl ${badge.glow}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <RiskIcon className="w-6 h-6" />
              <span className="text-xs font-bold tracking-widest uppercase font-mono">
                {riskLevel} THREAT RISK
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {riskScore >= 51 ? 'Suspicious Threat Detected' : 'Analytical Risk Assessment'}
            </h1>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-slate-200 border border-slate-700/80"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Risk Gauge Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shrink-0 min-w-[200px] text-center shadow-inner">
            <span className="text-xs font-mono uppercase text-slate-400 mb-1">Risk Index</span>
            <div className="text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
              <span>{riskScore}</span>
              <span className="text-sm font-normal text-slate-500 font-mono">/100</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${badge.barBg} transition-all duration-1000`}
                style={{ width: `${riskScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-2">
              Analytical Risk Estimate
            </span>
          </div>

        </div>

        {/* AI Synthesis Summary Box */}
        {explanation && (
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {explanation}
            </p>
          </div>
        )}
      </div>

      {/* Extracted text preview for Screenshot OCR */}
      {extractedText && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-white">OCR Extracted Text from Screenshot</span>
            {metadata.ocrConfidence && (
              <span className="font-mono text-cyan-400">Confidence: {metadata.ocrConfidence}%</span>
            )}
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300 max-h-40 overflow-y-auto leading-relaxed whitespace-pre-wrap border border-slate-800/80">
            {extractedText}
          </div>
        </div>
      )}

      {/* 2. "WHY IS THIS SUSPICIOUS?" SECTION (Prominent core requirement) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-400" />
              <span>WHY IS THIS SUSPICIOUS?</span>
            </h2>
            <p className="text-xs text-slate-400">
              Clear breakdown of deception indicators found in the analyzed input
            </p>
          </div>
        </div>

        {whySuspicious.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5">
            {whySuspicious.map((item, idx) => {
              const isCrit = item.severity === 'critical' || item.severity === 'high';
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-slate-900/90 border transition-all ${
                    isCrit ? 'border-red-500/30 bg-red-950/10' : 'border-amber-500/30 bg-amber-950/10'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="text-lg shrink-0 mt-0.5">{isCrit ? '🔴' : '🟠'}</span>
                    <div className="space-y-1 flex-1">
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.explanation}
                      </p>
                      {item.evidence && (
                        <div className="mt-2.5 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-300">
                          <span className="text-slate-500 mr-2">Evidence:</span>
                          "{item.evidence}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-200">
              No High-Risk Deception Indicators Flagged
            </p>
            <p className="text-xs text-slate-400">
              The content does not match active smishing, brand spoofing, or credential harvesting patterns.
            </p>
          </div>
        )}
      </section>

      {/* 3. TRANSPARENT RISK SCORING BREAKDOWN */}
      {scoreBreakdown.length > 0 && (
        <section className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Transparent Risk Score Breakdown</h3>
            <span className="text-xs font-mono text-cyan-400 font-semibold">Total: {riskScore}/100</span>
          </div>

          <div className="space-y-2">
            {scoreBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-200">{item.name}</span>
                  {item.evidence && (
                    <p className="text-[11px] text-slate-400 font-mono truncate max-w-md">
                      {item.evidence}
                    </p>
                  )}
                </div>
                <span className="font-mono font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800">
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. WHAT SHOULD YOU DO? (Actionable Recommendations) */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            WHAT SHOULD YOU DO?
          </h2>
          <p className="text-xs text-slate-400">
            Recommended defensive response steps to mitigate threat exposure
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Don'ts */}
          {recommendations.doNots?.length > 0 && (
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 font-mono">
                <XCircle className="w-4 h-4" />
                <span>Avoid These Actions</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {recommendations.doNots.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Do's */}
          {recommendations.dos?.length > 0 && (
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle className="w-4 h-4" />
                <span>Recommended Next Steps</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {recommendations.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>

      {/* 5. LEARN FROM THIS (Educational Connection) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
            <BookOpen className="w-4 h-4" />
            <span>Cyber Academy Insight</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Learn how to recognize this threat in the future
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {learningInsight || 'Master the psychological cues and domain inspection skills required to spot advanced digital scams.'}
          </p>
        </div>

        <button
          onClick={onGoToLearn}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Explore Cyber Academy</span>
          <BookOpen className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
