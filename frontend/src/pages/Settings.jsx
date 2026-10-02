import React from 'react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  ShieldCheck, 
  Trash2, 
  Database, 
  Volume2, 
  Lock, 
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';
import { threatApi } from '../services/api';

export default function Settings() {
  const { currentTheme, theme, changeTheme, availableThemes } = useTheme();
  const [clearedMsg, setClearedMsg] = React.useState('');

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to permanently erase all locally stored threat analysis logs?')) return;
    try {
      await threatApi.clearHistory();
      setClearedMsg('All scan history and local audit cache cleared successfully.');
      setTimeout(() => setClearedMsg(''), 4000);
    } catch (err) {
      alert('Failed to clear history');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800/80">
          <SettingsIcon className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>System Preferences & Personalization</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Settings & Customization
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Customize your cybersecurity interface, select color themes, configure sensory preferences, and manage privacy sovereignty.
        </p>
      </div>

      {clearedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{clearedMsg}</span>
        </div>
      )}

      {/* 1. THEME SELECTION SECTION */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg">
            <Palette className="w-5 h-5 text-cyan-400" />
            <h2>Visual Cybersecurity Theme</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Choose your preferred color palette and contrast mode for all threat analysis workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableThemes.map((th) => {
            const isSelected = currentTheme === th.id;
            return (
              <div
                key={th.id}
                onClick={() => changeTheme(th.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                {/* Theme Color Preview Orb */}
                <div 
                  className="w-8 h-8 rounded-xl border border-white/20 shadow-inner shrink-0 mt-0.5"
                  style={{ backgroundColor: th.accentColor }}
                />

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{th.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                        Active Theme
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {th.id === 'cyber' && 'Cyan & Slate Blue glassmorphism cyber operations center.'}
                    {th.id === 'matrix' && 'Hacker emerald green on pure black terminal background.'}
                    {th.id === 'crimson' && 'High-alert Red Team SOC crimson & dark burgundy palette.'}
                    {th.id === 'midnight' && 'Deep indigo & high-contrast midnight violet night mode.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. PRIVACY & DATA PURGE SECTION */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg">
            <Database className="w-5 h-5 text-red-400" />
            <h2>Data Sovereignty & Local Storage</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your persistent history cache. No credentials or passwords are ever stored.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="space-y-1">
            <span className="text-sm font-semibold text-white">Erase Local Threat History</span>
            <p className="text-xs text-slate-400">
              Permanently delete all previous scan logs, OCR snapshots, and analysis reports from local storage.
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            className="px-5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge All History</span>
          </button>
        </div>
      </section>

      {/* 3. ENGINE VERSION & COMPLIANCE BADGE */}
      <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>ThreatLens AI v1.2.0 • Rule Engine & Heuristics Build 2026.10</span>
        </div>
        <div className="text-cyan-300">
          GFG Code Sangam PS-06 Compliant
        </div>
      </section>

    </div>
  );
}
