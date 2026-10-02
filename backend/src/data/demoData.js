export const DEMO_EXAMPLES = [
  {
    id: 'demo-bank-phish',
    type: 'message',
    title: 'Fake Bank Account Block Message',
    description: 'A classic smishing attempt mimicking State Bank of India claiming urgent KYC expiry with an unofficial domain link.',
    data: {
      content: 'SBI ALERT: Dear Customer, your SBI account has been locked due to pending KYC verification. Please click http://sbi-kyc-verification.top/auth immediately within 24 hours to update your PAN & Aadhaar, or your account will be permanently closed.'
    }
  },
  {
    id: 'demo-delivery-scam',
    type: 'message',
    title: 'Fake Delivery Notification Scam',
    description: 'Delivery parcel fraud pretending to be India Post / FedEx requesting fee payment to clear customs.',
    data: {
      content: 'IndiaPost: Your package #IN-88921 is on hold due to incorrect address and unpaid customs fee of ₹49. Pay immediately within 12 hours at https://indiapost-parcel-delivery.xyz to avoid parcel return to sender.'
    }
  },
  {
    id: 'demo-prize-scam',
    type: 'message',
    title: 'Lottery & Prize Scam',
    description: 'High-reward deception urging user to pay an advance processing charge to claim a cash jackpot.',
    data: {
      content: 'CONGRATULATIONS! You have won ₹25,00,000 in KBC WhatsApp Lucky Draw 2026. To claim your prize money, send ₹2,500 registration charge immediately to Manager WhatsApp 9811223344 or visit http://kbc-lucky-winner-claim.xyz.'
    }
  },
  {
    id: 'demo-payment-fraud',
    type: 'payment',
    title: 'Suspicious Payment / UPI Request',
    description: 'Scammer asks user to scan QR and enter PIN to "receive" funds for an online item.',
    data: {
      amount: '15,000',
      payee: 'OLX Instant Buyer Escrow',
      note: 'Scan QR code and enter your secret UPI PIN to receive ₹15,000 directly into your bank account immediately.',
      linkOrVpa: 'escrow-collect-funds@fakeupi'
    }
  },
  {
    id: 'demo-url-phish',
    type: 'url',
    title: 'Lookalike Google Security Verification Link',
    description: 'A malicious subdomain impersonating Google’s security center on a high-risk TLD.',
    data: {
      url: 'https://google-security-verification.account-protection.xyz/login?ref=gmail'
    }
  },
  {
    id: 'demo-email-scam',
    type: 'email',
    title: 'Spoofed Executive Wire Transfer',
    description: 'CEO impersonation email attempting to bypass normal finance authorization procedures.',
    data: {
      sender: 'CEO Johnathan Miller <exec-office-johnathan@gmail.com>',
      subject: 'URGENT: Confidential Vendor Settlement Payment Required Today',
      body: 'Hi, I am currently stuck in executive leadership meetings with limited cell reception. We need to settle an urgent overseas invoice of $24,500 by today 4 PM to avoid contract termination. Please wire payment immediately to the account details attached and do not mention this to others until formal PR release tomorrow.',
      links: 'http://swift-vendor-invoice-portal.net/wire'
    }
  },
  {
    id: 'demo-legit-notification',
    type: 'message',
    title: 'Normal Low-Risk Transaction Message',
    description: 'A standard informational transaction alert from a genuine bank with no coercive links or credential requests.',
    data: {
      content: 'HDFC Bank Alert: Your A/C XX9012 was credited with INR 4,250.00 on 02-Oct-26 by UPI ref 410928192039. Balance is INR 28,150.00. If this transaction was not done by you, visit your nearest branch or call the number on the back of your debit card.'
    }
  }
];
