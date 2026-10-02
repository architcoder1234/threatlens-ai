import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  BookOpen, 
  History, 
  FileText, 
  Zap, 
  Sparkles,
  Info,
  Palette
} from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, onOpenDemoModal }) {
  const { currentTheme, theme, changeTheme, availableThemes } = useTheme();
  const [themeDropdownOpen, setThemeDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'analyze', label: 'Analyze Threat', icon: ShieldAlert },
    { id: 'simulator', label: 'Threat Sandbox', icon: Zap },
    { id: 'history', label: 'Threat History', icon: History },
    { id: 'learn', label: 'Cyber Academy', icon: BookOpen },
    { id: 'roadmap', label: 'Future Roadmap', icon: Sparkles },
    { id: 'privacy', label: 'Privacy & Architecture', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400 opacity-20 blur group-hover:opacity-40 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                  ThreatLens<span className="text-cyan-400"> AI</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  PS-06 Hackathon
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Evidence-Based Threat Analyzer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons: Theme Switcher + Live Demos */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Selector Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors cursor-pointer shadow-sm"
                title="Change Color Theme"
              >
                <div 
                  className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline font-mono">{theme.name}</span>
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 flex flex-col w-48 p-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                    <span>Select Color Theme</span>
                  </div>
                  {availableThemes.map(th => (
                    <button
                      key={th.id}
                      onClick={() => {
                        changeTheme(th.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                        currentTheme === th.id
                          ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div 
                        className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: th.accentColor }}
                      />
                      <span>{th.name}</span>
                      {currentTheme === th.id && (
                        <span className="ml-auto text-[10px] font-mono text-cyan-400">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenDemoModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">Try Live Demos</span>
              <span className="sm:hidden">Demos</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
