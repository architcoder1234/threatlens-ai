# ThreatLens AI — Evidence-Based Digital Threat Analyzer
> **GFG Code Sangam Hackathon Submission | Problem Statement PS-06: “Understanding Digital Threats”**
> 
> *“We don't just detect digital threats. We explain why they are dangerous. We teach users how to recognize the next one.”*

---

## 📋 Hackathon Compliance & Mandatory Disclosures

### 1. Mandatory Tool, Framework & AI Disclosures (As per Hackathon Rules)
In accordance with GFG Code Sangam rules on AI & API disclosure:
- **AI / LLM Integration:** Uses Google Gemini API / OpenAI API integration through secure backend environment variables for natural language explanation and summarization, coupled with custom deterministic heuristic engines and localized natural language fallback synthesis.
- **Vision OCR Engine:** Tesseract.js (Open-source optical character recognition) executed client/backend side for screenshot text extraction.
- **Frontend Frameworks & Libraries:** React 18, Vite, Tailwind CSS v4, Lucide React Icons, Canvas Confetti.
- **Backend Frameworks & Libraries:** Node.js, Express.js, Helmet, Express-Rate-Limit, CORS, Multer.
- **Threat Intelligence Feeds:** Localized heuristic signature databases with optional connectors to Google Safe Browsing and VirusTotal APIs.

### 2. Originality & Integrity Statement
- All application source code, custom heuristic algorithms, risk weighting equations, interactive threat sandbox scenarios, and multilingual educational content were authored and developed within the official GFG Code Sangam hackathon duration.

---

## 🎯 Problem Statement (PS-06) & Solution Overview

### The Problem
Every day, ordinary citizens fall victim to digital scams, smishing, look-alike domain phishing, UPI inverse-charge traps, executive spoofing, and "Digital Arrest" coercion. Conventional antivirus tools provide binary verdicts ("Safe" vs "Unsafe") without explanation, leaving users vulnerable to subsequent attack variations.

### The Solution: ThreatLens AI
ThreatLens AI shifts digital defense from opaque blocking to **transparent cognitive empowerment** through a 5-step pipeline:

$$\textbf{DETECT} \longrightarrow \textbf{EXPLAIN} \longrightarrow \textbf{SHOW EVIDENCE} \longrightarrow \textbf{RECOMMEND ACTION} \longrightarrow \textbf{EDUCATE}$$

---

## ✨ Key Features & Innovation Vectors

1. **🔗 Multi-Vector Threat Analyzer:**
   - **URLs:** Deep domain structure inspection, protocol security (HTTP vs HTTPS), look-alike brand spoofing, subdomain nesting, and abuse-prone TLD flags (`.xyz`, `.top`, `.tk`).
   - **SMS & Messages:** Lexical detection of psychological urgency manipulation ("within 1 hour", "blocked today"), credential harvesting, and lottery scams.
   - **Emails (BEC):** Sender domain mismatch detection (executives using free webmail `@gmail.com`), high-pressure subject lines, and fraudulent billing demands.
   - **Voice Vishing & "Digital Arrest":** Audits phone call transcripts for fake law enforcement intimidation, victim isolation demands, and remote screen-sharing tools (*AnyDesk, TeamViewer*).
   - **Payments & UPI:** Flags "Scan QR to receive money" or "Enter PIN to claim cashback" inversion traps, advance fee scams, and fake escrow schemes.
   - **Screenshot OCR:** Reads text from chat snapshots, payment receipts, and SMS screenshots using integrated Tesseract.js.

2. **⚖️ Transparent Explainable Risk Engine (0–100):**
   - Itemized score breakdown showing exactly which signals contributed points.
   - Multi-vector correlation elevating score when multiple deception techniques are combined.
   - Prominent **"WHY IS THIS SUSPICIOUS?"** section with direct quotes of detected evidence.

3. **🎮 Threat Sandbox & Attack Simulator:**
   - Interactive decision sandbox for real-life attacks (UPI QR Marketplace Scams, Fake Police Digital Arrest Video Calls, Subdomain Phishing).
   - Features mock attacker interfaces, interactive **"X-Ray Clues"**, and instant outcome feedback.

4. **🌐 Multilingual Cyber Academy & Reflex Quiz:**
   - Educational modules in **English (EN), हिंदी (Hindi), தமிழ் (Tamil), and తెలుగు (Telugu)**.
   - Interactive quiz with instant answer grading, confetti on mastery, and detailed explanations of **why** each answer is correct.

5. **📄 1-Click PDF Report & WhatsApp Brief Sharing:**
   - Users can share instant threat alerts with their families or export formal incident reports.

6. **🔒 Zero-Trust Privacy Architecture:**
   - Strict zero-credential storage policy (passwords, OTPs, PINs, and personal identity numbers are never persisted).

---

## 🏛️ Modular System Architecture

```
                                  [ USER INPUT ]
           (URL / SMS / Email / Voice Transcript / Payment / Screenshot OCR)
                                        │
                                        ▼
                             [ CONTENT EXTRACTION ]
                                        │
                       ┌────────────────┴────────────────┐
                       ▼                                 ▼
              [ LEXICAL & NLP ]                  [ OCR VISION ENGINE ]
            (Urgency, Fear, Coercion)              (Tesseract.js)
                       │                                 │
                       └────────────────┬────────────────┘
                                        │
                                        ▼
                            [ THREAT INTEL SERVICE ]
                        (Local Heuristics + VT / GSB)
                                        │
                                        ▼
                           [ RULE-BASED RISK ENGINE ]
                       (Transparent 0-100 Accumulator)
                                        │
                                        ▼
                             [ AI EXPLANATION LAYER ]
                       (Natural Language Threat Rationale)
                                        │
                                        ▼
                        [ ACTION RECOMMENDATION ENGINE ]
                          (Do's and Don'ts Checklist)
                                        │
                                        ▼
                       [ CYBER ACADEMY & SANDBOX LAB ]
```

---

## 🌐 Live Deployment & Repository Links

- 🚀 **Live Production Application:** [https://threatlens-ai-60k2.onrender.com](https://threatlens-ai-60k2.onrender.com)
- 📂 **GitHub Repository:** [https://github.com/architcoder1234/threatlens-ai](https://github.com/architcoder1234/threatlens-ai)
- 🩺 **Backend Health API:** [https://threatlens-ai-60k2.onrender.com/health](https://threatlens-ai-60k2.onrender.com/health)

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti |
| **Backend Engine** | Node.js (v24+), Express.js, Helmet, Express-Rate-Limit, CORS, Multer |
| **OCR Vision** | Tesseract.js |
| **AI / NLP** | Google Gemini API / OpenAI API with local deterministic NLP synthesis |
| **Hosting** | Render (Production Monorepo Web Service) |

---

## 🧪 Local Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/architcoder1234/threatlens-ai.git
cd threatlens-ai

# 2. Install dependencies & build
npm run install:all
npm run build

# 3. Start Backend Server
npm start
# Server will run on http://localhost:5000 (serving both API and Frontend)
```

### Running Automated Test Suite
```bash
cd backend
node test_suite.js
# Runs 33/33 comprehensive automated end-to-end tests
```

---

## 📜 REST API Documentation

| Method | Endpoint | Description | Sample Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/analyze/url` | URL structure & brand inspection | `{ "url": "https://sbi-kyc.top/auth" }` |
| `POST` | `/api/analyze/message` | SMS & chat urgency detection | `{ "content": "Your account is blocked today..." }` |
| `POST` | `/api/analyze/email` | Email header & BEC check | `{ "sender": "...", "subject": "...", "body": "..." }` |
| `POST` | `/api/analyze/payment` | UPI / QR trap check | `{ "amount": "15000", "payee": "...", "note": "..." }` |
| `POST` | `/api/analyze/audio` | Voice call / vishing check | `{ "transcript": "CBI Officer calling..." }` |
| `POST` | `/api/analyze/screenshot`| OCR image text extraction | Multipart form-data (`screenshot` file) |
| `GET` | `/api/history` | Retrieve past sanitized scans | — |
| `GET` | `/api/learning` | Fetch Academy modules & quiz | — |
| `POST` | `/api/quiz/submit` | Grade interactive quiz | `{ "answers": { "q1": 1, "q2": 2 } }` |
| `GET` | `/api/demo` | Fetch curated live test demos | — |

---

## 🛡️ Privacy & Security Principles
1. **Zero Credential Storage:** Passwords, OTPs, Aadhaar numbers, and UPI PINs are never stored or logged.
2. **Data Minimization:** Sanitization filters strip sensitive tokens prior to history persistence.
3. **Data Sovereignty:** Users can delete individual records or purge complete history with one click.
4. **Analytical Risk Estimate:** Clearly labeled as an analytical risk assessment heuristic rather than scientifically validated absolute safety.
