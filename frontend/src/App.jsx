import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import History from './pages/History';
import Learn from './pages/Learn';
import Privacy from './pages/Privacy';
import Roadmap from './pages/Roadmap';
import DemoModal from './components/DemoModal';
import { threatApi } from './services/api';
import { Shield, ExternalLink, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeChannel, setActiveChannel] = useState('url');
  const [currentReport, setCurrentReport] = useState(null);
  const [initialAnalyzeData, setInitialAnalyzeData] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Switch to analyze with specific channel
  const handleSelectAnalyzer = (channelId) => {
    setActiveChannel(channelId);
    setInitialAnalyzeData(null);
    setActiveTab('analyze');
  };

  // Called when an analysis finishes
  const handleAnalysisComplete = (report) => {
    setCurrentReport(report);
    setActiveTab('results');
  };

  // Run quick payload directly from dashboard bar
  const handleAnalyzePayload = async (channel, payload) => {
    try {
      let report;
      if (channel === 'url') {
        report = await threatApi.analyzeUrl(payload.url);
      } else if (channel === 'message') {
        report = await threatApi.analyzeMessage(payload.content);
      }
      if (report) {
        handleAnalysisComplete(report);
      }
    } catch (err) {
      alert(err.message || 'Analysis error');
    }
  };

  // Load a demo scenario
  const handleSelectDemo = (demo) => {
    setActiveChannel(demo.type);
    setInitialAnalyzeData(demo.data);
    setActiveTab('analyze');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col cyber-grid">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            onSelectAnalyzer={handleSelectAnalyzer}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onAnalyzePayload={handleAnalyzePayload}
          />
        )}

        {activeTab === 'analyze' && (
          <Analyze
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
            initialData={initialAnalyzeData}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {activeTab === 'results' && (
          <Results
            report={currentReport}
            onBackToAnalyze={() => setActiveTab('analyze')}
            onGoToLearn={() => setActiveTab('learn')}
          />
        )}

        {activeTab === 'history' && (
          <History
            onSelectReport={(report) => {
              setCurrentReport(report);
              setActiveTab('results');
            }}
          />
        )}

        {activeTab === 'learn' && <Learn />}

        {activeTab === 'roadmap' && <Roadmap />}

        {activeTab === 'privacy' && <Privacy />}
      </main>

      {/* Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectDemo={handleSelectDemo}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">ThreatLens AI</span>
            <span>— Evidence-Based Digital Threat Analyzer (GFG Code Sangam PS-06)</span>
          </div>
          <div>
            <span>“We don't just detect digital threats. We explain why they are dangerous and teach you how to recognize the next one.”</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
