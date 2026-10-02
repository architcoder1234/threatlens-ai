import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  FileText, 
  AlertTriangle, 
  Server, 
  EyeOff, 
  CheckCircle2,
  Database,
  Terminal
} from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800">
          <Lock className="w-3.5 h-3.5" />
          <span>Security & Privacy Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Transparent Security Principles
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          ThreatLens AI is engineered under strict zero-trust data minimization guidelines to empower users without putting their credentials at risk.
        </p>
      </div>

      {/* Core Privacy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Credential Storage</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ThreatLens never stores passwords, 6-digit OTP codes, Aadhaar/SSN numbers, or UPI PINs. Analysis is performed dynamically in volatile memory and sanitization filters strip high-risk tokens prior to history persistence.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">User Data Sovereignty</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You retain absolute ownership of all analysis history. You can inspect individual analysis reports or purge your complete local threat scan record at any time with a single click.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Hybrid Analysis Engine</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The platform combines deterministic regex heuristics, local domain structure analysis, and OCR with secure backend-only LLM reasoning. API keys are kept strictly on the backend server.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Analytical Risk Disclaimer</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ThreatLens provides an analytical security risk estimate (0-100) based on detected signals. We never claim "100% Safe" because cyber threats continuously evolve. Always verify through official channels.
          </p>
        </div>

      </div>

      {/* Pipeline Visual Architecture */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-cyan-400" />
          <span>Complete Modular Pipeline Architecture</span>
        </h2>

        <div className="space-y-3 text-xs font-mono">
          {[
            { step: '1. Ingestion', desc: 'Secure input sanitization (URL, text, email, payment, image multipart)' },
            { step: '2. OCR Processing', desc: 'Tesseract.js engine parses visual text from screenshots asynchronously' },
            { step: '3. Heuristics & Lexical Analysis', desc: 'Lexical URL parser, TLD scoring, homoglyph check, and brand token detection' },
            { step: '4. Threat Intelligence Layer', desc: 'Queries local threat DB with optional VirusTotal / Safe Browsing enrichment' },
            { step: '5. Rule-Based Risk Engine', desc: 'Transparent accumulative 0-100 scoring with multi-vector correlation' },
            { step: '6. AI Explanation & Guidance', desc: 'Generates plain-English threat rationale and actionable Do/Don’t defense advice' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-bold text-cyan-300">{item.step}</span>
              <span className="text-slate-400">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
