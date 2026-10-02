// Threat indicators and suspicious pattern definitions

export const SUSPICIOUS_DOMAINS = [
  'xyz', 'top', 'club', 'loan', 'work', 'gq', 'cf', 'tk', 'ml', 'ga', 
  'click', 'link', 'buzz', 'live', 'support', 'security-update', 'auth', 'verify', 'account'
];

export const TARGET_BRANDS = [
  { name: 'Google', keywords: ['google', 'gmail', 'drive-google', 'google-verify', 'accounts-google'] },
  { name: 'Microsoft', keywords: ['microsoft', 'office365', 'outlook', 'live-login', 'onedrive'] },
  { name: 'Apple', keywords: ['apple', 'icloud', 'appleid', 'apple-support'] },
  { name: 'PayPal', keywords: ['paypal', 'pay-pal', 'paypal-verify', 'paypal-secure'] },
  { name: 'Amazon', keywords: ['amazon', 'prime-delivery', 'amazon-order', 'amazon-pay'] },
  { name: 'Netflix', keywords: ['netflix', 'netflix-billing', 'netflix-update'] },
  { name: 'SBI Bank', keywords: ['sbi', 'onlinesbi', 'sbi-reward', 'sbi-kyc', 'sbicard'] },
  { name: 'HDFC Bank', keywords: ['hdfc', 'hdfcbank', 'hdfc-netbanking', 'hdfc-kyc'] },
  { name: 'ICICI Bank', keywords: ['icici', 'icicibank', 'icici-rewards', 'icici-kyc'] },
  { name: 'Paytm', keywords: ['paytm', 'paytm-cashback', 'paytm-wallet', 'paytm-kyc'] },
  { name: 'India Post', keywords: ['indiapost', 'india-post', 'speedpost-delivery', 'postal-dept'] },
  { name: 'Income Tax Dept', keywords: ['incometax', 'tax-refund', 'it-department', 'refund-portal'] },
  { name: 'Federal Reserve / IRS', keywords: ['irs-gov', 'irs-tax', 'fed-reserve', 'treasury-alert'] },
  { name: 'WhatsApp', keywords: ['whatsapp', 'wa-verification', 'whatsapp-support'] }
];

export const URGENCY_TRIGGERS = [
  'immediately', 'urgent', 'urgently', 'expires in', 'within 24 hours', 'within 12 hours', 
  'within 1 hour', 'today only', 'action required', 'immediate action', 'suspended permanently',
  'blocked today', 'blocked permanently', 'limited time', 'final notice', 'last warning',
  'time sensitive', 'act fast', 'instant access', 'don\'t wait'
];

export const ACCOUNT_THREAT_TRIGGERS = [
  'account suspended', 'account blocked', 'account terminated', 'deactivated', 'restricted',
  'unauthorized access', 'security alert', 'compromised', 'locked out', 'identity verification needed',
  'kyc expired', 'kyc update required', 'sim will be blocked', 'pan card linking', 'aadhaar expired',
  'card deactivated', 'electricity power cut', 'service disconnection'
];

export const CREDENTIAL_TRIGGERS = [
  'enter password', 'enter your password', 'share otp', 'enter otp', 'one time password',
  'pin code', 'secret pin', 'atm pin', 'cvv', 'card number', 'security answer', 'credentials',
  'login credentials', 'send passcode', 'verify identity with otp'
];

export const FINANCIAL_TRIGGERS = [
  'claim lottery', 'won $', 'won rs', 'won ₹', 'won cash', 'claim refund', 'tax refund',
  'instant loan approved', 'crypto reward', 'bitcoin transfer', 'transfer funds', 'wire payment',
  'processing fee', 'send money to release', 'cash prize', 'scratch card bonus', 'jackpot'
];

export const PAYMENT_FRAUD_PATTERNS = [
  'scan qr to receive money', 'enter pin to receive money', 'reverse charge refund', 
  'overpayment scam', 'advance fee', 'processing fee required before payout', 'fake escrow',
  'qr payment to collect refund', 'send 1 rs to verify upi'
];
