import React, { useState } from 'react';
import { 
  Link, 
  MessageSquare, 
  Mail, 
  CreditCard, 
  Image as ImageIcon, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  Upload,
  Cpu,
  Lock,
  Search,
  Sparkles
} from 'lucide-react';

export default function Dashboard({ onSelectAnalyzer, onOpenDemoModal, onAnalyzePayload }) {
  const [quickUrl, setQuickUrl] = useState('');
  const [quickLoading, setQuickLoading] = useState(false);

  const threatChannels = [
    {
      id: 'url',
      title: 'Analyze Suspicious URL',
      badge: 'Web & Phish Links',
      icon: Link,
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-400',
      description: 'Detect look-alike domains, brand hijacking, unencrypted protocols, and malicious TLD suffixes.'
    },
    {
      id: 'message',
      title: 'Analyze SMS / WhatsApp',
      badge: 'Smishing & Urgency',
      icon: MessageSquare,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
      description: 'Identify psychological urgency, fake lottery alerts, account block coercion, and hidden malicious links.'
    },
    {
      id: 'email',
      title: 'Analyze Suspicious Email',
      badge: 'Impersonation & BEC',
      icon: Mail,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400',
      description: 'Audit sender domain mismatches, executive spoofing, billing threats, and deceptive headers.'
    },
    {
      id: 'screenshot',
      title: 'Analyze Screenshot (OCR)',
      badge: 'Vision & Text Extractor',
      icon: ImageIcon,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
      description: 'Upload chats, suspicious payment receipts, or email snapshots. Extracted via client-integrated OCR.'
    },
    {
      id: 'payment',
      title: 'Analyze Payment Request',
      badge: 'UPI & Financial Scams',
      icon: CreditCard,
      color: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-400',
      description: 'Audit QR codes to receive money, reverse charge deceptions, advance fee scams, and fake escrow traps.'
    }
  ];

  const handleQuickAnalyze = async (e) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    setQuickLoading(true);
    try {
      await onAnalyzePayload('url', { url: quickUrl.trim() });
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>AI + Deterministic Heuristics + Threat Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            “Think Before <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              You Click.”
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Analyze suspicious digital content, understand transparent evidence, and learn how to recognize future cyber threats.
          </p>

          {/* Quick Scanner Bar */}
          <form onSubmit={handleQuickAnalyze} className="pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-xl">
              <div className="flex items-center gap-3 px-3 flex-1 w-full">
                <Search className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  placeholder="Paste a suspicious link (e.g. sbi-kyc-verify.top, bit.ly, login-apple.xyz)..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                disabled={quickLoading || !quickUrl.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {quickLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Inspect URL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Core Pipeline USP Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4 border-t border-slate-800/80 text-xs">
            {['1. DETECT', '2. EXPLAIN', '3. SHOW EVIDENCE', '4. RECOMMEND', '5. EDUCATE'].map((step, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{step}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Analysis Channels Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Select Input Vector</h2>
            <p className="text-sm text-slate-400">Choose the format of the suspicious content you encountered</p>
          </div>
          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Curated Demos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {threatChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.id}
                onClick={() => onSelectAnalyzer(channel.id)}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${channel.color} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {channel.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {channel.title}
                  </h3>
                  
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Deep Scanner</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}

          {/* OCR Instant Drop Banner Card */}
          <div 
            onClick={() => onSelectAnalyzer('screenshot')}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <div>
              <div className="p-3 w-fit rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 mb-4">
                <Upload className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct Screenshot OCR</h3>
              <p className="mt-2 text-sm text-slate-400">
                Drag & drop or upload WhatsApp, SMS, or banking screenshots. Tesseract OCR will parse text and scan automatically.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-300">
              <span>Drop Image File Here</span>
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Principles */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex gap-4 items-start">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Privacy First</h4>
            <p className="text-xs text-slate-400 mt-1">
              Passwords, PINs, and personal identity codes are never permanently stored or logged in telemetry.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex gap-4 items-start">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Explainable Risk Engine</h4>
            <p className="text-xs text-slate-400 mt-1">
              Risk scores from 0-100 with granular, itemized score contributions rather than opaque black-box verdicts.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex gap-4 items-start">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Actionable & Educational</h4>
            <p className="text-xs text-slate-400 mt-1">
              Every report includes explicit Do's and Don'ts checklist and teaches you the psychology behind the threat.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
