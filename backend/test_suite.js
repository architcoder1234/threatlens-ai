import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:5000/api';
let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
  }
}

async function runAllTests() {
  console.log('====================================================');
  console.log('🛡️  THREATLENS AI COMPREHENSIVE AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  // Test 1: Health Endpoint
  console.log('1. Testing System Health...');
  try {
    const health = await axios.get('http://localhost:5000/health');
    assert(health.status === 200, 'Health endpoint responds with 200');
    assert(health.data.status === 'ONLINE', 'System reports status ONLINE');
    assert(health.data.project === 'ThreatLens AI', 'Project identifier matches');
  } catch (err) {
    assert(false, `Health endpoint failed: ${err.message}`);
  }

  // Test 2: URL Analyzer (Phishing Link)
  console.log('\n2. Testing URL Analyzer with Malicious URL...');
  try {
    const res = await axios.post(`${API_BASE}/analyze/url`, {
      url: 'https://google-security-verification.account-protection.xyz/login?ref=gmail'
    });
    assert(res.status === 200, 'URL analysis responds with 200');
    assert(res.data.riskScore >= 75, `Risk score is high/critical (${res.data.riskScore}/100)`);
    assert(res.data.categories.includes('Phishing') || res.data.categories.includes('Malicious Link'), 'Categorized as Phishing / Malicious Link');
    assert(res.data.whySuspicious.length > 0, 'Why is this suspicious indicators extracted');
    assert(res.data.scoreBreakdown.length > 0, 'Transparent score breakdown generated');
    assert(res.data.recommendations.doNots.length > 0, 'Safety Don\'ts recommended');
  } catch (err) {
    assert(false, `URL analysis failed: ${err.message}`);
  }

  // Test 3: URL Analyzer (Clean URL)
  console.log('\n3. Testing URL Analyzer with Legitimate URL...');
  try {
    const res = await axios.post(`${API_BASE}/analyze/url`, {
      url: 'https://google.com'
    });
    assert(res.status === 200, 'Clean URL responds with 200');
    assert(res.data.riskScore <= 20, `Clean URL has low risk score (${res.data.riskScore}/100)`);
    assert(res.data.riskLevel === 'LOW', 'Risk level marked LOW');
  } catch (err) {
    assert(false, `Clean URL analysis failed: ${err.message}`);
  }

  // Test 4: Message Analyzer (Urgency & Credential Coercion)
  console.log('\n4. Testing Message Analyzer with Fake Bank Smishing...');
  try {
    const res = await axios.post(`${API_BASE}/analyze/message`, {
      content: 'SBI ALERT: Dear Customer, your account is suspended. Share OTP immediately or enter password at http://sbi-kyc.top within 1 hour.'
    });
    assert(res.status === 200, 'Message analysis responds with 200');
    assert(res.data.riskScore >= 75, `Smishing score is critical (${res.data.riskScore}/100)`);
    assert(res.data.categories.includes('Credential Theft') || res.data.categories.includes('Social Engineering'), 'Categorized as Credential Theft / Social Engineering');
    assert(res.data.whySuspicious.some(w => w.title.includes('Urgency') || w.title.includes('Credential')), 'Urgency and Credential indicators identified');
  } catch (err) {
    assert(false, `Message analysis failed: ${err.message}`);
  }

  // Test 5: Email Analyzer (Executive Spoofing)
  console.log('\n5. Testing Email Analyzer with CEO Wire Scam...');
  try {
    const res = await axios.post(`${API_BASE}/analyze/email`, {
      sender: 'CEO Johnathan Miller <exec-office-johnathan@gmail.com>',
      subject: 'URGENT: Confidential Payment Required Today',
      body: 'Please transfer $25,000 immediately to our vendor account.',
      links: 'http://swift-vendor-invoice.xyz'
    });
    assert(res.status === 200, 'Email analysis responds with 200');
    assert(res.data.riskScore >= 70, `Email fraud score is high (${res.data.riskScore}/100)`);
    assert(res.data.whySuspicious.some(w => w.title.includes('Impersonation') || w.title.includes('Sender')), 'Impersonation on free mailbox detected');
  } catch (err) {
    assert(false, `Email analysis failed: ${err.message}`);
  }

  // Test 6: Payment Request Analyzer (UPI QR / PIN Inversion Trap)
  console.log('\n6. Testing Payment Analyzer with UPI Receiving Trap...');
  try {
    const res = await axios.post(`${API_BASE}/analyze/payment`, {
      amount: '15,000',
      payee: 'OLX Buyer Escrow',
      note: 'Scan QR code and enter your secret UPI PIN to receive ₹15,000 in your bank account',
      linkOrVpa: 'collect-funds@fakeupi'
    });
    assert(res.status === 200, 'Payment analysis responds with 200');
    assert(res.data.riskScore >= 60, `Payment fraud score is critical (${res.data.riskScore}/100)`);
    assert(res.data.whySuspicious.some(w => w.title.includes('PIN') || w.title.includes('Payment')), 'UPI PIN receive deception detected');
  } catch (err) {
    assert(false, `Payment analysis failed: ${err.message}`);
  }

  // Test 7: History APIs (Get, Filter, Item, Delete, Clear)
  console.log('\n7. Testing History Management APIs...');
  try {
    const listRes = await axios.get(`${API_BASE}/history`);
    assert(Array.isArray(listRes.data), 'History returns an array');
    assert(listRes.data.length > 0, `History contains ${listRes.data.length} recorded scans`);

    const firstItem = listRes.data[0];
    const singleRes = await axios.get(`${API_BASE}/history/${firstItem.id}`);
    assert(singleRes.data.id === firstItem.id, 'Single report fetched by ID matches');

    // Test Delete by ID
    const delRes = await axios.delete(`${API_BASE}/history/${firstItem.id}`);
    assert(delRes.status === 200, 'Report deleted successfully');
  } catch (err) {
    assert(false, `History API failed: ${err.message}`);
  }

  // Test 8: Learning Modules & Demo Endpoints
  console.log('\n8. Testing Cyber Academy & Demo Endpoints...');
  try {
    const learnRes = await axios.get(`${API_BASE}/learning`);
    assert(learnRes.data.modules && learnRes.data.modules.length >= 5, `Academy modules count >= 5 (${learnRes.data.modules?.length})`);
    assert(learnRes.data.quiz && learnRes.data.quiz.length >= 5, `Quiz questions count >= 5 (${learnRes.data.quiz?.length})`);

    const demoRes = await axios.get(`${API_BASE}/demo`);
    assert(demoRes.data && demoRes.data.length >= 5, `Curated demo scenarios >= 5 (${demoRes.data?.length})`);
  } catch (err) {
    assert(false, `Learning / Demo API failed: ${err.message}`);
  }

  // Test 9: Interactive Quiz Submission Grading
  console.log('\n9. Testing Interactive Quiz Grading Engine...');
  try {
    const quizRes = await axios.post(`${API_BASE}/quiz/submit`, {
      answers: { q1: 1, q2: 2, q3: 0, q4: 1, q5: 1 }
    });
    assert(quizRes.status === 200, 'Quiz submission returns 200');
    assert(quizRes.data.score === 5, `Quiz perfect score achieved (${quizRes.data.score}/5)`);
    assert(quizRes.data.percentage === 100, 'Percentage is 100%');
    assert(quizRes.data.review.every(r => r.reason), 'All quiz questions have detailed WHY explanations');
  } catch (err) {
    assert(false, `Quiz grading failed: ${err.message}`);
  }

  // Summary
  console.log('\n====================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log('====================================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runAllTests();
