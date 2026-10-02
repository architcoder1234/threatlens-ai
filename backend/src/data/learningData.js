// Learning lessons content
export const LEARNING_MODULES = [
  {
    id: 'phishing',
    title: 'Phishing',
    tag: 'Web & Email',
    icon: 'Fish',
    whatIsIt: 'Phishing is a deceptive technique where attackers create fraudulent websites or emails mimicking trusted entities (like banks, tech giants, or streaming platforms) to trick you into revealing sensitive credentials or payment data.',
    howItWorks: 'Attackers register domains with slight misspellings or extra subdomains (e.g., netflix-billing-update.com). When you visit the fake site and type your password or credit card, it sends the data directly to the criminal server.',
    warningSigns: [
      'Look-alike domain names with weird extensions (.xyz, .tk, .live)',
      'Subdomains containing the brand name while the actual domain is different (e.g. google.com.attacker-site.ru)',
      'Fake security alerts demanding immediate login',
      'Generic greetings like "Dear Customer" instead of your actual registered name'
    ],
    example: {
      title: 'Fake Google Security Alert',
      content: 'Critical Security Alert! An unknown device logged into your Google Account. Click here to verify ownership: https://accounts-google.security-fix.xyz/login'
    },
    whatShouldYouDo: [
      'Check the actual root domain in the address bar before typing credentials',
      'Never click login links inside unsolicited emails or messages',
      'Bookmark official login pages and navigate directly from browser bookmarks',
      'Enable Multi-Factor Authentication (MFA) via Authenticator apps or security keys'
    ]
  },
  {
    id: 'smishing',
    title: 'Smishing & WhatsApp Scams',
    tag: 'SMS / Messaging',
    icon: 'MessageSquareWarning',
    whatIsIt: 'Smishing (SMS Phishing) involves fraudulent text messages or instant messaging chats designed to evoke fear, greed, or curiosity to get you to click malicious links or install malicious APKs.',
    howItWorks: 'Scammers send bulk SMS with headers imitating courier services, power companies, or banks. They claim urgent action is required—such as electricity cutoff tonight or postal parcel hold—forcing panic reactions.',
    warningSigns: [
      'Claims of impending disconnection (e.g., electricity, SIM card, bank KYC)',
      'Shortened suspicious links (bit.ly, tinyurl, or random IP addresses)',
      'Sent from an unfamiliar personal 10-digit mobile number claiming to be an official bank/institution',
      'Requests to download an APK or remote assistance app (AnyDesk, TeamViewer)'
    ],
    example: {
      title: 'Electricity Disconnection Smish',
      content: 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because your previous bill was not updated. Please immediately call officer at 9876543210 or update bill: http://power-ebill-pay.xyz'
    },
    whatShouldYouDo: [
      'Official utility services never contact you from personal mobile numbers demanding urgent APK downloads',
      'Call the official utility hotline listed on your physical utility bill or official portal',
      'Block and report the sender number as spam',
      'Never install unknown APKs or remote screen-sharing tools'
    ]
  },
  {
    id: 'urgency-manipulation',
    title: 'Urgency Manipulation & Panic Tactics',
    tag: 'Psychology',
    icon: 'Clock',
    whatIsIt: 'A core social engineering tactic that exploits psychological cognitive biases by creating an artificial state of emergency, preventing the victim from conducting rational verification.',
    howItWorks: 'Attackers create a strict time limit (e.g., "Account locked in 15 minutes!", "Pay within 1 hour or arrest warrant issued"). High adrenaline and panic cloud judgment, making people click links or transfer funds hastily.',
    warningSigns: [
      'Extreme deadlines ("within 1 hour", "today only", "immediate action required")',
      'Threats of legal consequences, police action, or instant financial penalty',
      'Pressure to act in secrecy without consulting family or official channels',
      'Countdown timers or aggressive wording'
    ],
    example: {
      title: 'Fake Customs / Police Threat',
      content: 'FINAL WARNING: A parcel containing contraband in your name was intercepted by Customs. Pay clearing fee ₹14,500 within 30 minutes to avoid immediate police warrant: upi-pay@fake'
    },
    whatShouldYouDo: [
      'Take a deep breath and pause: Real law enforcement and legitimate banks do not threaten immediate arrest via chat',
      'Recognize urgency as an intentional manipulation technique',
      'Independently reach out to the official agency through their verified public website'
    ]
  },
  {
    id: 'fake-payment-requests',
    title: 'Fake Payment & UPI Scams',
    tag: 'Financial',
    icon: 'CreditCard',
    whatIsIt: 'Scams involving UPI, QR codes, or payment links where victims are misled into believing they are receiving money, when in reality they are authorizing a debit.',
    howItWorks: 'Scammers on marketplace portals (OLX, FB Marketplace) pose as buyers, send a QR code or "Pay" request on Google Pay/PhonePe/Paytm, claiming "Scan this QR or enter your UPI PIN to receive the money".',
    warningSigns: [
      'Asking you to ENTER your UPI PIN or scan a QR code to RECEIVE money',
      'Reverse charge or overpayment claims ("I accidentally sent you 50,000 instead of 5,000")',
      'Demands for a "processing fee" or "token amount" before disbursing a loan or lottery',
      'Fake screenshot receipts showing funds in transit'
    ],
    example: {
      title: 'OLX UPI Buyer Scam',
      content: 'Buyer: I have sent ₹10,000 advance payment for your sofa. Scan this merchant QR code and enter your PIN to claim the funds in your bank account.'
    },
    whatShouldYouDo: [
      'Golden Rule of UPI: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money',
      'Entering a PIN always deducts money from your account',
      'Decline any request asking for upfront processing fees to claim refunds or prizes'
    ]
  },
  {
    id: 'credential-theft',
    title: 'Credential Theft & OTP Fraud',
    tag: 'Identity & Access',
    icon: 'Key',
    whatIsIt: 'Attempts by attackers to acquire sensitive one-time passcodes (OTPs), multi-factor tokens, passwords, or PINs to take over financial or social accounts.',
    howItWorks: 'Attackers initiate a password reset or fund transfer, then contact you claiming to be bank support who sent you a "cancellation OTP" to stop the unauthorized charge. When you share the OTP, you authenticate the transfer.',
    warningSigns: [
      'Anyone asking you to read out or forward an OTP received on your phone',
      'Unsolicited OTP SMS messages when you were not actively making a transaction',
      'Forms asking for ATM PIN, CVV, and net banking password together'
    ],
    example: {
      title: 'Fake Bank Support Call / SMS',
      content: 'SBI Alert: Your NetBanking access is temporarily disabled. We have sent a 6-digit unlock OTP to your phone. Share this OTP immediately with our agent to retain access.'
    },
    whatShouldYouDo: [
      'Never share OTPs with anyone, including bank employees or technical support',
      'Read the full SMS text: OTP messages clearly state "Do not share this with anyone"',
      'If you receive unexpected OTPs, immediately change your account password and review active sessions'
    ]
  },
  {
    id: 'impersonation',
    title: 'Brand & Executive Impersonation',
    tag: 'Social Engineering',
    icon: 'ShieldAlert',
    whatIsIt: 'Cybercriminals masquerading as authoritative organizations (banks, tax departments, tech support, your company CEO) to exploit established trust.',
    howItWorks: 'By spoofing email sender names (e.g. "CEO Name <ceo-personal-mailbox@gmail.com>") or creating cloned login portals with authentic branding and logos, attackers trick victims into complying with unauthorized directives.',
    warningSigns: [
      'Sender email address domain doesn\'t match the official brand domain (e.g. support@netflix-billing.com instead of support@netflix.com)',
      'Unusual requests from company executives asking to buy gift cards or make urgent wire transfers secretly',
      'Use of generic free email domains (@gmail.com, @hotmail.com) for official corporate communication'
    ],
    example: {
      title: 'Fake CEO Gift Card Request',
      content: 'From: CEO John <john.executivedesk99@gmail.com>\nSubject: Urgent - In a meeting\nHey, I am tied up in an all-day board meeting. I urgently need 5 Apple Gift Cards ($100 each) for client presentation. Buy them and email me the codes right away.'
    },
    whatShouldYouDo: [
      'Inspect the full email header and actual sender email address, not just the display name',
      'Establish a secondary verification channel (call or in-person check) for any out-of-band financial request',
      'Report impersonation attempts to your organization’s IT security team'
    ]
  }
];

// Interactive Quiz Questions
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'You receive an SMS: "SBI: Your KYC has expired! Click http://sbi-kyc-update.xyz to update within 2 hours to prevent account freeze." What is the main danger signal?',
    options: [
      { text: 'The message is written in English rather than your regional language', correct: false, reason: 'Language choice is not an indicator of a security threat.' },
      { text: 'The domain "sbi-kyc-update.xyz" is not the official bank domain (onlinesbi.sbi / sbi.co.in) and uses urgency manipulation', correct: true, reason: 'Correct! Banks operate on verified corporate domains (.sbi / .co.in) and never use cheap .xyz domains or threaten immediate 2-hour account blocks via SMS.' },
      { text: 'The message does not include the bank manager’s signature', correct: false, reason: 'Automated bank notices do not have manager signatures.' },
      { text: 'Banks only contact consumers via postal letters', correct: false, reason: 'Banks do use SMS, but legitimate SMS never lead to unofficial third-party domains.' }
    ],
    difficulty: 'Easy'
  },
  {
    id: 'q2',
    question: 'A buyer on an online marketplace says they will pay you ₹5,000 for your used bicycle. They send a QR code and ask you to "Scan and enter your UPI PIN to claim payment". What happens if you enter your PIN?',
    options: [
      { text: '₹5,000 will be credited directly to your bank account', correct: false, reason: 'Entering a PIN never credits money; it exclusively authorizes debits.' },
      { text: 'The bank will put the funds in an escrow balance', correct: false, reason: 'UPI does not hold funds in escrow via PIN entry.' },
      { text: '₹5,000 (or more) will be immediately deducted from your bank account', correct: true, reason: 'Correct! UPI PIN is ONLY entered to deduct money from your account. You NEVER need to enter a PIN or scan a QR code to receive money.' },
      { text: 'The transaction will simply cancel safely', correct: false, reason: 'Entering your PIN successfully executes the fraudulent charge.' }
    ],
    difficulty: 'Medium'
  },
  {
    id: 'q3',
    question: 'Which of the following URLs is the legitimate Google account security page?',
    options: [
      { text: 'https://myaccount.google.com/security', correct: true, reason: 'Correct! "google.com" is the exact root domain, and "myaccount" is a legitimate subdomain owned by Google.' },
      { text: 'https://google.com.account-verification-security.net/login', correct: false, reason: 'This domain is actually "account-verification-security.net". "google.com" is just a deceitful prefix/subdomain!' },
      { text: 'http://myaccount-google-security.xyz/auth', correct: false, reason: 'This uses an unverified .xyz domain with hyphens attempting brand impersonation.' },
      { text: 'https://google-login-portal.com', correct: false, reason: 'This is a third-party domain that is not owned by google.com.' }
    ],
    difficulty: 'Medium'
  },
  {
    id: 'q4',
    question: 'You receive an email from "Netflix Support <billing@netflix-account-reactivation.co>" saying your payment method failed and your streaming will stop today. What should you do first?',
    options: [
      { text: 'Click the link in the email and re-enter your credit card information right away', correct: false, reason: 'This gives your credit card details directly to phishing attackers.' },
      { text: 'Open your browser, manually type "netflix.com", log in, and check your account billing status there', correct: true, reason: 'Correct! Always verify account issues independently via the official app or website URL rather than following email links.' },
      { text: 'Reply to the email with your credit card CVV code', correct: false, reason: 'Never send payment details over plaintext email.' },
      { text: 'Forward the email to all your family members to check if they used your card', correct: false, reason: 'This doesn\'t solve the verification and could spread malicious links.' }
    ],
    difficulty: 'Easy'
  },
  {
    id: 'q5',
    question: 'Why do cybercriminals frequently use urgency phrases like "Account will be blocked in 15 minutes" or "Urgent Action Required"?',
    options: [
      { text: 'Because cybersecurity regulations legally require them to act fast', correct: false, reason: 'Criminals are deliberately violating regulations.' },
      { text: 'To trigger panic and emotional haste, preventing victims from carefully checking evidence or verifying the source', correct: true, reason: 'Correct! Urgency short-circuits rational analysis and encourages quick, unverified action.' },
      { text: 'Because fake server links expire every 15 minutes', correct: false, reason: 'Fake links can remain active for days or weeks.' },
      { text: 'It is simply a standard email template format', correct: false, reason: 'It is a deliberate psychological manipulation technique.' }
    ],
    difficulty: 'Hard'
  }
];
