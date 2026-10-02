import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  cyber: {
    id: 'cyber',
    name: 'Cyber Slate',
    accentColor: '#06b6d4', // Cyan
    bgClass: 'bg-slate-950 text-slate-100',
    navBg: 'bg-slate-950/85 border-slate-800',
    cardBg: 'bg-slate-900/90 border-slate-800',
    inputBg: 'bg-slate-950 border-slate-700',
    accentGradient: 'from-cyan-500 to-blue-600',
    accentText: 'text-cyan-400',
    badgeBg: 'bg-cyan-950 text-cyan-400 border-cyan-800',
    btnPrimary: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    glow: 'shadow-cyan-500/20'
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Terminal',
    accentColor: '#22c55e', // Emerald/Green
    bgClass: 'bg-[#020d06] text-emerald-100',
    navBg: 'bg-[#03140a]/90 border-emerald-950',
    cardBg: 'bg-[#041a0d]/90 border-emerald-900/60',
    inputBg: 'bg-[#020d06] border-emerald-800',
    accentGradient: 'from-emerald-500 to-green-600',
    accentText: 'text-emerald-400',
    badgeBg: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    glow: 'shadow-emerald-500/20'
  },
  crimson: {
    id: 'crimson',
    name: 'Red Team Ops',
    accentColor: '#f43f5e', // Rose/Red
    bgClass: 'bg-[#0f0406] text-rose-100',
    navBg: 'bg-[#18060a]/90 border-rose-950',
    cardBg: 'bg-[#1c080d]/90 border-rose-900/60',
    inputBg: 'bg-[#0f0406] border-rose-800',
    accentGradient: 'from-rose-500 to-red-600',
    accentText: 'text-rose-400',
    badgeBg: 'bg-rose-950 text-rose-400 border-rose-800',
    btnPrimary: 'bg-rose-500 hover:bg-rose-400 text-white',
    glow: 'shadow-rose-500/20'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Purple',
    accentColor: '#a855f7', // Purple/Violet
    bgClass: 'bg-[#070312] text-purple-100',
    navBg: 'bg-[#0e0722]/90 border-purple-950',
    cardBg: 'bg-[#140b2e]/90 border-purple-900/60',
    inputBg: 'bg-[#070312] border-purple-800',
    accentGradient: 'from-purple-500 to-indigo-600',
    accentText: 'text-purple-400',
    badgeBg: 'bg-purple-950 text-purple-400 border-purple-800',
    btnPrimary: 'bg-purple-500 hover:bg-purple-400 text-white',
    glow: 'shadow-purple-500/20'
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('cyber');

  useEffect(() => {
    const saved = localStorage.getItem('threatlens_theme');
    if (saved && THEMES[saved]) {
      setCurrentTheme(saved);
    }
  }, []);

  const changeTheme = (themeId) => {
    if (THEMES[themeId]) {
      setCurrentTheme(themeId);
      localStorage.setItem('threatlens_theme', themeId);
    }
  };

  const theme = THEMES[currentTheme] || THEMES.cyber;

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, changeTheme, availableThemes: Object.values(THEMES) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
