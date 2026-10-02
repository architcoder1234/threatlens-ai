import React, { useState, useEffect } from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Search,
  ExternalLink,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { threatApi } from '../services/api';

export default function History({ onSelectReport }) {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await threatApi.getHistory();
      setHistoryList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await threatApi.deleteHistory(id);
      setHistoryList(historyList.filter(item => item.id !== id));
      setMessage('Report deleted');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to delete all threat analysis records?')) return;
    try {
      await threatApi.clearHistory();
      setHistoryList([]);
      setMessage('All history cleared');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = historyList.filter(item => {
    if (filterType !== 'ALL' && item.inputType?.toLowerCase() !== filterType.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSnippet = item.previewSnippet?.toLowerCase().includes(q);
      const matchCat = item.categories?.some(c => c.toLowerCase().includes(q));
      const matchType = item.inputType?.toLowerCase().includes(q);
      return matchSnippet || matchCat || matchType;
    }
    return true;
  });

  const getRiskColor = (score) => {
    if (score >= 76) return 'text-red-400 bg-red-950/60 border-red-800';
    if (score >= 51) return 'text-orange-400 bg-orange-950/60 border-orange-800';
    if (score >= 21) return 'text-amber-400 bg-amber-950/60 border-amber-800';
    return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Title & Clear Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <HistoryIcon className="w-8 h-8 text-cyan-400" />
            <span>Threat Analysis History</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit logs of scanned links, messages, and screenshots. Credentials are automatically sanitized.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-950 text-red-400 border border-red-800/80 text-xs font-semibold transition-all cursor-pointer w-fit"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past scans..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'url', 'message', 'email', 'screenshot', 'payment'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterType === t
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading analysis logs...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-base font-semibold text-slate-300">No threat analysis records found</p>
          <p className="text-xs text-slate-500">
            Scans performed in the Threat Analyzer will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {filteredItems.map((item) => {
            const riskBadge = getRiskColor(item.riskScore);
            return (
              <div
                key={item.id}
                onClick={() => onSelectReport(item)}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer gap-4 shadow-sm"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                      {item.inputType}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-cyan-300 transition-colors">
                    {item.previewSnippet || item.title || 'Threat Scan'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {item.categories?.slice(0, 3).map((cat, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* Score badge */}
                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${riskBadge}`}>
                    Score: {item.riskScore}/100 ({item.riskLevel})
                  </div>

                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                    title="Delete log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
