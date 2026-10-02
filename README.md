# ThreatLens AI — Evidence-Based Digital Threat Analyzer
> **GFG Code Sangam Hackathon — Problem Statement PS-06: “Understanding Digital Threats”**
> 
> *“We don't just detect digital threats. We explain why they are dangerous. We teach users how to recognize the next one.”*

---

## 1. Problem Statement & Motivation
Every day, millions of non-technical internet users fall prey to smishing, look-alike domain phishing, UPI inverse-charge traps, executive spoofing, and social engineering. Most existing antivirus tools and browser extensions simply issue binary verdicts ("Safe" vs "Unsafe") or block pages without explanation. 

**The Problem:**
- Ordinary users do not understand *why* a particular message or link is dangerous.
- Because they do not learn the deception techniques, they easily fall for the next variation of the scam.
- Fear, urgency manipulation, and authority imitation short-circuit rational verification.

---

## 2. Our Solution: ThreatLens AI
**ThreatLens AI** is an evidence-based digital threat analyzer and interactive cyber academy. It shifts cybersecurity defense from opaque blocking to transparent empowerment:

$$\textbf{DETECT} \longrightarrow \textbf{EXPLAIN} \longrightarrow \textbf{SHOW EVIDENCE} \longrightarrow \textbf{RECOMMEND ACTION} \longrightarrow \textbf{EDUCATE}$$

### Core Capabilities:
1. **🔗 URL Analyzer:** Deep domain inspection, HTTP unencrypted protocol detection, look-alike brand spoofing, subdomain nesting, homoglyph indicators, and abuse-prone TLD flags (`.xyz`, `.top`, `.tk`, etc.).
2. **💬 SMS & Messaging Analyzer:** Natural language and lexical parser detecting psychological urgency manipulation ("within 1 hour"), account suspension coercion, credential harvesting, and financial lottery deception.
3. **📧 Email & BEC Inspector:** Audits sender domain mismatches, executive identity spoofing on free webmail accounts (`@gmail.com`), high-pressure subject lines, and deceptive attachments.
4. **📸 Direct Screenshot OCR:** Integrated client/backend Tesseract.js engine capable of reading chat screenshots (WhatsApp, SMS), payment confirmations, or fake notices directly from images.
5. **💳 Payment & UPI Fraud Detector:** Specifically identifies "Scan QR to receive money" or "Enter PIN to claim cashback" inversion traps, advance fee scams, and fake escrow schemes.
6. **🎓 Cyber Academy & Reflex Quiz:** Educational threat library explaining attacker psychology, realistic attack breakdowns, defensive rules, and an interactive quiz with instant feedback.

---

## 3. Modular Architecture

```
                                  [ USER INPUT ]
               (URL / SMS / Email / Screenshot OCR / Payment Request)
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
                            [ CYBER ACADEMY LESSON ]
```

---

## 4. Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS v4, Lucide React Icons, Canvas Confetti.
- **Backend:** Node.js (v24+), Express.js, Helmet, Express-Rate-Limit, CORS, Multer.
- **OCR Engine:** Tesseract.js (Multi-threaded optical character recognition).
- **AI / LLM Layer:** Secure backend-only LLM integration (Google Gemini / OpenAI compatible) with rich deterministic fallback synthesis.
- **Threat Intelligence:** Multi-tiered heuristics database with optional external connectors (VirusTotal API, Google Safe Browsing).
- **Persistence:** Sanitized, zero-credential in-memory & file cache store.

---

## 5. Risk Scoring Methodology

ThreatLens uses a transparent, itemized scoring engine from **0 to 100**:

| Risk Score | Threat Level | Visual Indicator | Action Policy |
| :--- | :--- | :--- | :--- |
| **0 – 20** | **LOW RISK** | 🟢 Emerald | No strong threat indicators detected; exercise normal caution. |
| **21 – 50** | **MEDIUM RISK** | 🟡 Amber | Potential risk detected; independent verification required. |
| **51 – 75** | **HIGH RISK** | 🟠 Orange | High probability of deception; avoid clicking links or entering data. |
| **76 – 100** | **CRITICAL RISK**| 🔴 Red | Strong evidence of malicious intent; cease all interaction immediately. |

### Transparent Score Breakdown Example:
```
+25  Look-alike Brand Impersonation (Google)
+20  Suspicious Top-Level Domain (.xyz)
+18  Urgency Manipulation & Pressure Tactics
+20  Threat Intelligence Match
─────────────────────────────────────────────
Total Risk Estimate: 83 / 100 (CRITICAL RISK)
```

> **Important Note:** Scoring is an analytical risk assessment heuristic and does not guarantee absolute safety. We never say "100% Safe".

---

## 6. Installation & Quickstart

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Clone & Setup Backend
```bash
cd backend
npm install
npm run dev
# Backend starts at http://localhost:5000
```

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
# Frontend starts at http://localhost:5173
```

---

## 7. Environment Configuration (`.env`)

Create a `.env` file in `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# Optional LLM API Key (Fallback NLP engine operates automatically if omitted)
GEMINI_API_KEY=
OPENAI_API_KEY=

# External Threat Intelligence APIs (Optional)
VIRUSTOTAL_API_KEY=
GOOGLE_SAFE_BROWSING_KEY=
```

---

## 8. REST API Documentation

| Method | Endpoint | Description | Sample Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/analyze/url` | Deep URL inspection | `{ "url": "https://sbi-kyc.top/auth" }` |
| `POST` | `/api/analyze/message` | SMS / chat threat parsing | `{ "content": "Your account is blocked today..." }` |
| `POST` | `/api/analyze/email` | Header & body audit | `{ "sender": "...", "subject": "...", "body": "..." }` |
| `POST` | `/api/analyze/payment` | UPI / payment trap check | `{ "amount": "15000", "payee": "...", "note": "..." }` |
| `POST` | `/api/analyze/screenshot` | OCR image text extraction | Multipart form-data (`screenshot` file) |
| `GET` | `/api/history` | Retrieve past sanitized scans | — |
| `DELETE`| `/api/history/:id` | Remove a specific report | — |
| `GET` | `/api/learning` | Fetch Academy modules & quiz | — |
| `POST` | `/api/quiz/submit` | Grade interactive quiz | `{ "answers": { "q1": 1, "q2": 2 } }` |
| `GET` | `/api/demo` | Fetch curated live test demos | — |

---

## 9. Privacy & Safety Principles

1. **Zero Credential Storage:** Passwords, 6-digit OTPs, Aadhaar numbers, and UPI PINs are never stored or logged in telemetry.
2. **Backend Secret Isolation:** API keys reside strictly on the server and are never bundled into frontend assets.
3. **Sanitization on Ingestion:** Analysis records are stripped of sensitive parameters before storage.
4. **Data Purge:** Users can clear history records at any time.

---

## 10. Future Scope & Roadmap
- **Browser Extension:** Inline real-time DOM scanner highlighting deceptive form fields before submission.
- **Multi-lingual NLP:** Expanding dialect detection to 12+ regional Indian languages for rural smishing protection.
- **Community Threat Sharing:** Decentralized threat telemetry sharing verified indicators with open-source threat databases.
- **Audio Vishing Analyzer:** Live speech-to-text analyzer flagging phone scam intimidation patterns.
