import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  MessageSquare, 
  Mail, 
  CreditCard, 
  Image as ImageIcon, 
  Upload, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  FileText,
  HelpCircle
} from 'lucide-react';
import { threatApi } from '../services/api';

export default function Analyze({ activeChannel, setActiveChannel, onAnalysisComplete, initialData }) {
  const [channel, setChannel] = useState(activeChannel || 'url');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [urlInput, setUrlInput] = useState(initialData?.url || '');
  const [messageInput, setMessageInput] = useState(initialData?.content || '');
  const [emailSender, setEmailSender] = useState(initialData?.sender || '');
  const [emailSubject, setEmailSubject] = useState(initialData?.subject || '');
  const [emailBody, setEmailBody] = useState(initialData?.body || '');
  const [emailLinks, setEmailLinks] = useState(initialData?.links || '');
  
  // Payment state
  const [payAmount, setPayAmount] = useState(initialData?.amount || '');
  const [payPayee, setPayPayee] = useState(initialData?.payee || '');
  const [payNote, setPayNote] = useState(initialData?.note || '');
  const [payLink, setPayLink] = useState(initialData?.linkOrVpa || '');

  // Voice Vishing state
  const [voiceTranscript, setVoiceTranscript] = useState(initialData?.transcript || '');
  const [callerName, setCallerName] = useState(initialData?.callerName || '');
  const [callerNumber, setCallerNumber] = useState(initialData?.callerNumber || '');

  // Screenshot OCR state
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ocrProgressText, setOcrProgressText] = useState('');

  const handleChannelSwitch = (newChannel) => {
    setChannel(newChannel);
    if (setActiveChannel) setActiveChannel(newChannel);
    setError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
        return;
      }
      setScreenshotFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let report = null;

      if (channel === 'url') {
        if (!urlInput.trim()) throw new Error('Please enter a URL to analyze.');
        report = await threatApi.analyzeUrl(urlInput.trim());
      } else if (channel === 'message') {
        if (!messageInput.trim()) throw new Error('Please paste message text to analyze.');
        report = await threatApi.analyzeMessage(messageInput.trim());
      } else if (channel === 'email') {
        if (!emailBody.trim() && !emailSubject.trim()) throw new Error('Please provide email subject or body.');
        report = await threatApi.analyzeEmail({
          sender: emailSender.trim(),
          subject: emailSubject.trim(),
          body: emailBody.trim(),
          links: emailLinks.trim()
        });
      } else if (channel === 'payment') {
        if (!payNote.trim() && !payAmount.trim() && !payPayee.trim()) {
          throw new Error('Please provide payment request details.');
        }
        report = await threatApi.analyzePayment({
          amount: payAmount.trim(),
          payee: payPayee.trim(),
          note: payNote.trim(),
          linkOrVpa: payLink.trim()
        });
      } else if (channel === 'voice') {
        if (!voiceTranscript.trim()) throw new Error('Please enter call transcript or suspicious speech notes.');
        report = await threatApi.analyzeAudio({
          transcript: voiceTranscript.trim(),
          callerName: callerName.trim(),
          callerNumber: callerNumber.trim()
        });
      } else if (channel === 'screenshot') {
        if (!screenshotFile) throw new Error('Please upload an image screenshot.');
        setOcrProgressText('Running Tesseract OCR & extracting textual intelligence...');
        report = await threatApi.analyzeScreenshot(screenshotFile);
      }

      if (report) {
        onAnalysisComplete(report);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
      setOcrProgressText('');
    }
  };

  const channelsList = [
    { id: 'url', label: 'URL / Link', icon: LinkIcon },
    { id: 'message', label: 'SMS / Chat', icon: MessageSquare },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'screenshot', label: 'Screenshot (OCR)', icon: ImageIcon },
    { id: 'payment', label: 'Payment / UPI', icon: CreditCard },
    { id: 'voice', label: 'Voice / Vishing', icon: Sparkles }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Title banner */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Threat Analysis Engine
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Input suspicious content for multi-layered verification: protocol validation, behavioral heuristics, and AI security synthesis.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {channelsList.map((ch) => {
          const Icon = ch.icon;
          const isSelected = channel === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleChannelSwitch(ch.id)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Form Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* URL Mode */}
          {channel === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Suspicious Web Address / URL
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://sbi-kyc-verification.top/auth or google-security-verification.xyz"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm font-mono"
                  required
                />
              </div>
              <p className="text-xs text-slate-400">
                Tip: Works with full URLs (<span className="text-cyan-400">https://...</span>) or domain fragments.
              </p>
            </div>
          )}

          {/* Message Mode */}
          {channel === 'message' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Pasted SMS, WhatsApp, or Social Media Message
                </label>
                <textarea
                  rows={6}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Paste the full suspicious text message here (including sender claims, links, and urgent instructions)..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm leading-relaxed"
                  required
                />
              </div>
              <p className="text-xs text-slate-400">
                ThreatLens automatically extracts embedded links and scans for psychological coercion triggers.
              </p>
            </div>
          )}

          {/* Email Mode */}
          {channel === 'email' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Sender Display Name & Address
                  </label>
                  <input
                    type="text"
                    value={emailSender}
                    onChange={(e) => setEmailSender(e.target.value)}
                    placeholder="e.g. Netflix Support <billing-update@gmail.com>"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="e.g. URGENT: Your Account Has Been Suspended"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Body Text
                </label>
                <textarea
                  rows={4}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Paste the email body text..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Embedded Links (Optional if already in body)
                </label>
                <input
                  type="text"
                  value={emailLinks}
                  onChange={(e) => setEmailLinks(e.target.value)}
                  placeholder="e.g. http://netflix-account-reactivation.co/auth"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          )}

          {/* Screenshot Mode */}
          {channel === 'screenshot' && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-200">
                Upload Suspicious Screenshot (WhatsApp, SMS, Payment receipt, Email)
              </label>

              <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500/80 rounded-2xl p-6 text-center bg-slate-950/60 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Uploaded Screenshot"
                      className="max-h-60 mx-auto rounded-lg shadow-md border border-slate-700 object-contain"
                    />
                    <p className="text-xs text-cyan-400 font-mono">
                      {screenshotFile?.name} ({(screenshotFile?.size / 1024).toFixed(1)} KB) - Click to change
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 py-6">
                    <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">Click or drag & drop image</span>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, JPEG, WEBP up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {ocrProgressText && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800 text-cyan-300 text-xs flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>{ocrProgressText}</span>
                </div>
              )}
            </div>
          )}

          {/* Payment Request Mode */}
          {channel === 'payment' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Claimed Payee / Sender Name
                  </label>
                  <input
                    type="text"
                    value={payPayee}
                    onChange={(e) => setPayPayee(e.target.value)}
                    placeholder="e.g. OLX Buyer Escrow, PhonePe Cashback Desk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Amount (₹ / $)
                  </label>
                  <input
                    type="text"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="e.g. 15,000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Payment Instructions / Notes Given to You
                </label>
                <textarea
                  rows={3}
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="e.g. 'Scan this QR code and enter your UPI PIN to receive ₹15,000 in your account immediately'"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  UPI VPA or Payment Link (Optional)
                </label>
                <input
                  type="text"
                  value={payLink}
                  onChange={(e) => setPayLink(e.target.value)}
                  placeholder="e.g. refund-collect@fakeupi or payment link"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          )}

          {/* Voice / Vishing Mode */}
          {channel === 'voice' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Caller Name / Display Claimed
                  </label>
                  <input
                    type="text"
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    placeholder="e.g. Police Officer Sharma / Customs Dept"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Incoming Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={callerNumber}
                    onChange={(e) => setCallerNumber(e.target.value)}
                    placeholder="e.g. +91 9876543210 or Unknown"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Call Transcript or Speech Notes (What did the caller say?)
                </label>
                <textarea
                  rows={5}
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                  placeholder="e.g. 'This is CBI Officer from New Delhi. A parcel with drugs in your name was seized at Mumbai Airport. Stay on Skype call in a closed room and do not tell your family. Download AnyDesk to verify your bank accounts immediately to avoid digital arrest warrant.'"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 leading-relaxed"
                  required
                />
              </div>
              <p className="text-xs text-slate-400">
                ThreatLens scans for coercive 'Digital Arrest' intimidation, victim isolation demands, and remote screen-sharing tools.
              </p>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Full privacy: Zero credential storage</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing Analysis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Threat Analysis</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
