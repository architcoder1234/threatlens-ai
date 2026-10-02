import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Shield,
  Clock,
  Key,
  CreditCard,
  MessageSquareWarning,
  Fish,
  ShieldAlert
} from 'lucide-react';
import { threatApi } from '../services/api';
import confetti from 'canvas-confetti';

export default function Learn() {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' or 'quiz'
  const [modules, setModules] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [multilingual, setMultilingual] = useState({});
  const [selectedLang, setSelectedLang] = useState('en');
  const [loading, setLoading] = useState(true);

  // Active module modal or expanded item
  const [selectedModule, setSelectedModule] = useState(null);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuizResult, setSubmittedQuizResult] = useState(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await threatApi.getLearning();
        setModules(data.modules || []);
        setQuizQuestions(data.quiz || []);
        setMultilingual(data.multilingual || {});
        if (data.modules?.length > 0) {
          setSelectedModule(data.modules[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const t = multilingual[selectedLang] || {
    heroBadge: 'Interactive Cyber Academy',
    title: 'Learn How to Spot Digital Threats',
    subtitle: 'Understand attacker psychology, master warning signs, and test your defensive instincts.',
    tabLessons: 'Threat Lessons',
    tabQuiz: 'Interactive Quiz'
  };

  const handleSelectOption = (qId, optIdx) => {
    if (submittedQuizResult) return; // Prevent modifying after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const handleSubmitQuiz = async () => {
    setSubmittingQuiz(true);
    try {
      const res = await threatApi.submitQuiz(selectedAnswers);
      setSubmittedQuizResult(res);
      if (res.percentage >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuizResult(null);
    setCurrentQIndex(0);
  };

  const getModuleIcon = (iconName) => {
    switch (iconName) {
      case 'Fish': return Fish;
      case 'MessageSquareWarning': return MessageSquareWarning;
      case 'Clock': return Clock;
      case 'CreditCard': return CreditCard;
      case 'Key': return Key;
      case 'ShieldAlert': return ShieldAlert;
      default: return Shield;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400">Loading Cyber Academy knowledge base...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800/80 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.heroBadge || 'Interactive Cyber Academy'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.title || 'Learn How to Spot Digital Threats'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {t.subtitle || 'Understand attacker psychology, master warning signs, and test your defensive instincts.'}
          </p>
        </div>

        {/* Controls: Language Selector + Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Language Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            {[
              { id: 'en', label: 'EN' },
              { id: 'hi', label: 'हिंदी' },
              { id: 'ta', label: 'தமிழ்' },
              { id: 'te', label: 'తెలుగు' }
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedLang === lang.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'modules'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabLessons || 'Threat Lessons'} ({modules.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.tabQuiz || 'Interactive Quiz'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 1. LESSON MODULES TAB */}
      {activeTab === 'modules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Module Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3 px-1">
              Core Cyber Deception Topics
            </h2>

            {modules.map((mod) => {
              const Icon = getModuleIcon(mod.icon);
              const isSelected = selectedModule?.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${
                    isSelected ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">{mod.tag}</span>
                    <h3 className="text-sm font-bold text-white truncate">{mod.title}</h3>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Selected Module Deep-Dive Card */}
          <div className="lg:col-span-8">
            {selectedModule ? (
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-8 shadow-xl">
                
                {/* Header */}
                <div className="border-b border-slate-800 pb-5">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800">
                    {selectedModule.tag}
                  </span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-3">
                    {selectedModule.title}
                  </h2>
                </div>

                {/* What is it? */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    1. What is it?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {selectedModule.whatIsIt}
                  </p>
                </div>

                {/* How does it work? */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    2. How does the attack work?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {selectedModule.howItWorks}
                  </p>
                </div>

                {/* Warning Signs */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono">
                    3. Key Warning Signs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedModule.warningSigns.map((sign, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold shrink-0 mt-0.5">⚠️</span>
                        <span>{sign}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Realistic Example */}
                {selectedModule.example && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider font-mono">
                      4. Realistic Attack Scenario
                    </h3>
                    <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/50 space-y-1.5">
                      <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider font-mono">
                        {selectedModule.example.title}
                      </h4>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {selectedModule.example.content}
                      </div>
                    </div>
                  </div>
                )}

                {/* What should you do? */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    5. How to Defend Yourself
                  </h3>
                  <div className="space-y-2">
                    {selectedModule.whatShouldYouDo.map((def, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-xl bg-emerald-950/15 border border-emerald-900/40 text-xs sm:text-sm text-emerald-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{def}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* 2. INTERACTIVE QUIZ TAB */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {submittedQuizResult ? (
            /* Quiz Score Summary Card */
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
              <div className="p-4 w-fit mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Award className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">
                  Quiz Completed!
                </h2>
                <p className="text-sm text-slate-400">
                  You scored <span className="text-cyan-400 font-bold">{submittedQuizResult.score}</span> out of <span className="text-white font-bold">{submittedQuizResult.total}</span> ({submittedQuizResult.percentage}%)
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-64 mx-auto bg-slate-800 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${submittedQuizResult.percentage >= 80 ? 'bg-emerald-400' : 'bg-amber-400'} transition-all`}
                  style={{ width: `${submittedQuizResult.percentage}%` }}
                />
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4 text-left pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Detailed Answer Explanations:
                </h3>

                {submittedQuizResult.review?.map((rev, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      rev.isCorrect ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-red-950/20 border-red-900/50'
                    } space-y-2`}
                  >
                    <div className="flex items-start gap-2">
                      {rev.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {rev.question}
                      </p>
                    </div>

                    <div className="pl-7 space-y-1 text-xs text-slate-300">
                      <p><span className="text-slate-500">Your answer:</span> {rev.selectedOption}</p>
                      {!rev.isCorrect && (
                        <p><span className="text-emerald-400">Correct answer:</span> {rev.correctOption}</p>
                      )}
                      <p className="text-cyan-300 pt-1 font-mono">
                        💡 <span className="font-semibold">WHY:</span> {rev.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          ) : (
            /* Active Quiz Form */
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                  Cyber Reflex Test • {quizQuestions.length} Questions
                </span>
                <span className="text-xs text-slate-400">
                  Answered: {Object.keys(selectedAnswers).length}/{quizQuestions.length}
                </span>
              </div>

              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={q.id} className="space-y-3 p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-cyan-400 font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 shrink-0">
                        Q{qIdx + 1}
                      </span>
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedAnswers[q.id] === oIdx;
                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${
                              isChosen
                                ? 'bg-cyan-500/15 border-cyan-500 text-cyan-200 shadow-sm'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isChosen ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                            }`}>
                              {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </div>
                            <span>{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Quiz button */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={submittingQuiz || Object.keys(selectedAnswers).length === 0}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submittingQuiz ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Grading Answers...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Submit & Reveal Why</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
