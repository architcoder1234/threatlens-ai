import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Globe2, 
  Layers, 
  Bot, 
  Volume2, 
  ShieldCheck, 
  Eye, 
  Zap,
  ArrowUpRight,
  Workflow
} from 'lucide-react';

export default function Roadmap() {
  const roadmapItems = [
    {
      quarter: 'PHASE 1: LIVE IN PRODUCTION',
      status: 'Active / Shipped',
      statusColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
      title: 'Core Multi-Vector Threat Intelligence Engine',
      items: [
        'Deterministic Heuristic & Domain Structure Engine (0-100 explainable score)',
        'Lookalike Brand Impersonation & Security Hyphenation Detection',
        'Tesseract OCR Vision Engine for Screenshot Text Recognition',
        'UPI PIN Inversion & QR Code Receiving Trap Detection',
        'Interactive Cyber Academy & Reflex Quiz with instant "WHY" reasoning'
      ]
    },
    {
      quarter: 'PHASE 2: NEXT-GEN ENHANCEMENTS',
      status: 'In Progress / Preview',
      statusColor: 'text-cyan-400 bg-cyan-950 border-cyan-800',
      title: 'Voice Vishing, BEC & Multilingual Expansion',
      items: [
        'AI Voice Call & Robocall "Digital Arrest" Transcription Analyzer',
        'Multilingual Academy Localization in Hindi, Tamil, Telugu, and Bengali',
        'Executive BEC Deep Header Audit with DKIM / SPF / DMARC verification',
        '1-Click Export to PDF Incident Report & Social Sharing Cards'
      ]
    },
    {
      quarter: 'PHASE 3: COMMUNITY & EXTENSION ECOSYSTEM',
      status: 'Upcoming Roadmap',
      statusColor: 'text-purple-400 bg-purple-950 border-purple-800',
      title: 'Client-Side Real-Time Protection Shield',
      items: [
        'ThreatLens Chrome & Firefox Extension for real-time DOM form field audits',
        'Decentralized Threat Telemetry & community honeypot indicator feed',
        'WhatsApp/Telegram Automated Scam Reporter Bot (@ThreatLensBot)',
        'Zero-Knowledge Encrypted Organization Dashboard for Enterprise Teams'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800/80">
          <Compass className="w-4 h-4 animate-spin" />
          <span>Product Innovation & Evolution</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Future Scope & Technical Roadmap
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          ThreatLens AI is evolving from a standalone web analyzer into a holistic, proactive digital defense ecosystem.
        </p>
      </div>

      {/* Roadmap Cards */}
      <div className="space-y-6">
        {roadmapItems.map((phase, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl hover:border-slate-700 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                {phase.quarter}
              </span>
              <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${phase.statusColor} w-fit`}>
                {phase.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {phase.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {phase.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300"
                >
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✦</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vision Statement Box */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Core Design Philosophy</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            “Shift Security from Blind Blocking to User Cognitive Defense.”
          </h4>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            By building transparency into every score and teaching the psychology behind fraud, ThreatLens turns ordinary citizens into their own strongest firewall.
          </p>
        </div>
      </div>

    </div>
  );
}
