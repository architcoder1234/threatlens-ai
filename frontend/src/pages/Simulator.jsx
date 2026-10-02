import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Eye,
  Crosshair,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export const SIMULATION_SCENARIOS = [
  {
    id: 'sim-upi',
    vector: 'UPI QR Fraud',
    title: 'Marketplace Buyer QR Scam',
    difficulty: 'Medium',
    story: 'You listed a laptop for sale on OLX for ₹25,000. A buyer messages claiming they work in the Army and want to pay ₹25,000 advance immediately.',
    attackerPayload: {
      type: 'payment_request',
      qrLabel: 'Scan QR to Receive ₹25,000 directly into your bank',
      amount: '₹25,000',
      actionText: 'Enter UPI PIN to approve receipt of funds',
      screenType: 'Google Pay / PhonePe simulation'
    },
    threatClues: [
      'Prompt says "Enter UPI PIN to receive money"',
      'Legitimate UPI NEVER asks for a PIN to receive payments',
      'Buyer insists on immediate transaction without seeing the product'
    ],
    choices: [
      {
        id: 'c1',
        text: 'Scan the QR code and enter your 6-digit UPI PIN to claim the ₹25,000.',
        isCorrect: false,
        outcome: '🚨 ₹25,000 was deducted from your account! Entering your PIN authorizes a debit, not a credit.'
      },
      {
        id: 'c2',
        text: 'Decline entering PIN. Inform the buyer that receiving UPI money requires only your phone number/VPA, never a PIN.',
        isCorrect: true,
        outcome: '🛡️ Excellent catch! You protected your funds. The fundamental rule of UPI: PIN is ONLY entered to pay money, never to receive.'
      }
    ]
  },
  {
    id: 'sim-digital-arrest',
    vector: 'Digital Arrest Call',
    title: 'Fake Police Contraband Call',
    difficulty: 'Hard',
    story: 'You receive an urgent WhatsApp video call from a person wearing a police uniform with Mumbai Police emblem in the background.',
    attackerPayload: {
      type: 'voice_call',
      callerDisplay: 'DCP Crime Branch - Mumbai Police',
      dialogue: '"Your Aadhaar was used in a ₹4.2 Crore money laundering courier. You are under Digital Arrest. Stay on video call in a locked room and transfer ₹1.5 Lakhs to our verification escrow RBI account."',
      actionText: 'Transfer ₹1,50,000 to "RBI Verification Reserve"'
    },
    threatClues: [
      'There is NO legal concept of "Digital Arrest" under Indian law',
      'Police never conduct interrogations or demand money transfers over video calls',
      'Isolating you in a room is a psychological tactic to block family advice'
    ],
    choices: [
      {
        id: 'c1',
        text: 'Panic, stay in the room, and transfer ₹1.5 Lakhs to avoid police arrest at your house.',
        isCorrect: false,
        outcome: '🚨 Fraud completed. Scammers collected ₹1.5 Lakhs and disappeared. Law enforcement never asks for money transfers.'
      },
      {
        id: 'c2',
        text: 'Immediately disconnect the call. Report the number to cybercrime.gov.in (National Cyber Crime Helpline: 1930) and inform family.',
        isCorrect: true,
        outcome: '🛡️ Perfect defensive action! Digital arrest is 100% fake. Government agencies never demand money transfers or video arrests.'
      }
    ]
  },
  {
    id: 'sim-subdomain-phish',
    vector: 'Subdomain Phishing',
    title: 'Netflix Billing Expiry URL',
    difficulty: 'Easy',
    story: 'You receive an SMS alert saying your Netflix subscription expired and streaming is blocked.',
    attackerPayload: {
      type: 'url_prompt',
      linkUrl: 'https://netflix.com.account-billing-reactivation.top/login',
      actualDomain: 'account-billing-reactivation.top',
      fakeBrandPrefix: 'netflix.com.'
    },
    threatClues: [
      'The actual root domain is "account-billing-reactivation.top", not "netflix.com"',
      '"netflix.com" is just a deceitful prefix/subdomain to trick mobile users',
      'Uses disposable .top top-level domain'
    ],
    choices: [
      {
        id: 'c1',
        text: 'Click the link and enter your Netflix email and credit card CVV to reactivate.',
        isCorrect: false,
        outcome: '🚨 Your credit card data was captured on attacker server "account-billing-reactivation.top".'
      },
      {
        id: 'c2',
        text: 'Inspect the address bar, identify that the root domain is not netflix.com, and open netflix.com manually in browser.',
        isCorrect: true,
        outcome: '🛡️ Masterful domain inspection! You spotted that the domain ending is .top and avoided credential harvesting.'
      }
    ]
  }
];

export default function ThreatSimulator() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showClues, setShowClues] = useState(false);

  const scenario = SIMULATION_SCENARIOS[activeScenarioIdx];

  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setShowClues(false);
    setActiveScenarioIdx((prev) => (prev + 1) % SIMULATION_SCENARIOS.length);
  };

  const handleReset = () => {
    setSelectedChoice(null);
    setShowClues(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800/80">
          <Crosshair className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Interactive Threat Sandbox</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Attack Simulation Sandbox
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Test your defensive decision-making in high-risk simulated scam environments without putting real money or data at risk.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {SIMULATION_SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setActiveScenarioIdx(idx);
              setSelectedChoice(null);
              setShowClues(false);
            }}
            className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1 ${
              activeScenarioIdx === idx
                ? 'bg-cyan-500/20 border border-cyan-500/50 shadow-md'
                : 'hover:bg-slate-800/60 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">{sc.vector}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">{sc.difficulty}</span>
            </div>
            <span className="text-xs font-bold text-white truncate">{sc.title}</span>
          </button>
        ))}
      </div>

      {/* Main Simulation Arena Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Scenario Context */}
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Eye className="w-4 h-4" />
            <span>Scenario Briefing • {scenario.vector}</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {scenario.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {scenario.story}
          </p>
        </div>

        {/* Mock Attacker Interface / Trap View */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-red-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase font-bold text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Attacker Trap Presentation</span>
            </span>
            <button
              onClick={() => setShowClues(!showClues)}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showClues ? 'Hide X-Ray Clues' : 'Reveal X-Ray Clues'}</span>
            </button>
          </div>

          {scenario.attackerPayload.linkUrl && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-red-300 break-all">
              <span className="text-slate-500">Deceptive URL: </span>
              {scenario.attackerPayload.linkUrl}
            </div>
          )}

          {scenario.attackerPayload.dialogue && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs italic text-slate-200 leading-relaxed">
              "{scenario.attackerPayload.dialogue}"
            </div>
          )}

          {scenario.attackerPayload.qrLabel && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <div className="text-2xl font-black text-amber-400">{scenario.attackerPayload.amount}</div>
              <div className="text-xs font-bold text-slate-300">{scenario.attackerPayload.qrLabel}</div>
              <div className="text-[11px] font-mono text-red-400 uppercase tracking-wide px-2 py-1 rounded bg-red-950/60 w-fit mx-auto border border-red-900">
                {scenario.attackerPayload.actionText}
              </div>
            </div>
          )}

          {/* Hidden X-Ray Clues */}
          {showClues && (
            <div className="mt-3 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/80 space-y-1.5 text-xs text-amber-200 animate-in fade-in duration-200">
              <span className="font-bold flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>ThreatLens X-Ray Evidence Signals:</span>
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {scenario.threatClues.map((clue, cIdx) => (
                  <li key={cIdx}>{clue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Choices */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
            What is your decision?
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {scenario.choices.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              let choiceStyle = 'bg-slate-950 border-slate-800 hover:border-cyan-500/40 text-slate-200';
              if (isSelected) {
                choiceStyle = choice.isCorrect 
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10'
                  : 'bg-red-950/40 border-red-500 text-red-200 shadow-md shadow-red-500/10';
              }

              return (
                <div
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3.5 ${choiceStyle}`}
                >
                  <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    {isSelected && (
                      <div className={`w-2 h-2 rounded-full ${choice.isCorrect ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    )}
                  </div>
                  <span className="leading-relaxed flex-1">{choice.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcome Feedback Card */}
        {selectedChoice && (
          <div className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
            selectedChoice.isCorrect 
              ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
              : 'bg-red-950/30 border-red-800 text-red-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedChoice.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Defensive Success!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span>Compromise Simulated!</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
              {selectedChoice.outcome}
            </p>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
              >
                Retry
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Next Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
