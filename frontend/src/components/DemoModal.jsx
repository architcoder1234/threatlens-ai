import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight, ShieldAlert, CheckCircle, Mail, MessageSquare, Link, CreditCard } from 'lucide-react';
import { threatApi } from '../services/api';

export default function DemoModal({ isOpen, onClose, onSelectDemo }) {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      threatApi.getDemoExamples()
        .then(data => setDemos(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getChannelIcon = (type) => {
    switch (type) {
      case 'url': return Link;
      case 'message': return MessageSquare;
      case 'email': return Mail;
      case 'payment': return CreditCard;
      default: return ShieldAlert;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live Threat Demos</h2>
              <p className="text-xs text-slate-400">Select an authentic scenario to analyze immediately</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-400">Loading demo catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {demos.map((demo) => {
              const Icon = getChannelIcon(demo.type);
              const isLegit = demo.id.includes('legit');
              return (
                <div
                  key={demo.id}
                  onClick={() => {
                    onSelectDemo(demo);
                    onClose();
                  }}
                  className="group p-4 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${
                      isLegit ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' : 'bg-red-950/40 border-red-800 text-red-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {demo.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                          {demo.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {demo.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Load</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
