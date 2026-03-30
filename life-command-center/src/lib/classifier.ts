const CATEGORY_RULES: { category: string; keywords: string[] }[] = [
  {
    category: 'kids',
    keywords: ['cheer', 'practice', 'tumbl', 'competition', 'recital', 'dance', 'soccer', 'sport', 'league', 'camp', 'scout', 'allstar', 'gymnastics'],
  },
  {
    category: 'school',
    keywords: ['school', 'teacher', 'parent-teacher', 'report card', 'homework', 'pta', 'iep', 'ard', 'sped', 'special ed', 'grade', 'classwork', 'pfisd', 'highland park', 'caldwell'],
  },
  {
    category: 'medical',
    keywords: ['doctor', 'dentist', 'appointment', 'lab result', 'prescription', 'pharmacy', 'immuniz', 'vaccine', 'pediatr', 'dermat', 'optom', 'therapist', 'mychart', 'patient portal'],
  },
  {
    category: 'bills',
    keywords: ['bill', 'payment due', 'invoice', 'statement', 'autopay', 'utility', 'electric', 'water', 'internet', 'insurance', 'mortgage', 'rent', 'tuition'],
  },
  {
    category: 'pets',
    keywords: ['vet', 'grooming', 'heartworm', 'flea', 'pet', 'cavalier', 'dog food', 'boarding', 'kennel', 'vca', 'careclub'],
  },
  {
    category: 'home',
    keywords: ['lawn', 'hvac', 'plumb', 'repair', 'maintenance', 'home warranty', 'pest control', 'garage', 'roof', 'appliance', 'lawnstarter'],
  },
  {
    category: 'personal',
    keywords: ['skincare', 'salon', 'spa', 'massage', 'facial', 'workout', 'gym', 'beauty'],
  },
  {
    category: 'other_actionable',
    keywords: ['confirm', 'reminder', 'schedule', 'appoint', 'rsvp', 'deadline', 'due', 'renew', 'expir'],
  },
];

// Single match = instant spam (very high confidence these are junk)
const INSTANT_SPAM_KEYWORDS = [
  'unsubscribe', 'you have been selected', 'congratulations', 'claim your prize',
  'winner', 'inheritance', 'beneficiary', 'wire transfer', 'weight loss',
  'earn money', 'work from home', 'free gift', 'act now', 'limited time',
  'click here', 'verify your account', 'account suspended',
  'pre-approved', 'you qualify', 'exclusive offer', 'special promotion',
  'dear valued customer', 'dear sir/madam', 'nigerian', 'prince',
  'opt out', 'opt-out', 'manage preferences', 'email preferences',
  'manage your subscription', 'update your preferences',
  'view in browser', 'view email in browser', 'view as webpage',
  'no longer wish to receive', 'sent you this email because',
  'receiving this email because', 'email was sent to',
  'if you no longer', 'you are receiving this',
];

// Two matches = spam
const SPAM_KEYWORDS = [
  'collection', 'debt', 'past due notice', 'final notice',
  'newsletter', 'marketing', 'promotional',
  'bill collector', 'account in default', 'wage garnishment',
  'refinance offer', 'survey invitation',
  'recruiting', 'job opportunity', 'career opportunity', 'we are hiring',
  'talent acquisition', 'staffing', 'headhunter', 'job alert',
  'apply now', 'job opening', 'resume', 'we found your resume',
  'credit score', 'credit repair', 'consolidation', 'settlement offer',
  'payment plan offer', 'collections agency', 'overdue account',
  'urgent response required', 'debt relief', 'loan offer', 'cash advance',
  'discount code', 'coupon', 'deal of the day',
  'buy now', 'order now', 'special offer', 'exclusive deal',
  'collections department', 'legal action', 'warrant',
  'sale ends', 'flash sale', 'clearance', 'savings inside',
  'shop now', 'order today', 'limited stock', 'while supplies last',
  'free shipping', 'free trial', 'risk free', 'money back',
  'new arrival', 'just dropped', 'trending now',
  'social security', 'irs', 'tax refund', 'unclaimed',
  'your account has been', 'suspicious activity', 'confirm your identity',
  'cashback', 'rewards points', 'redeem now', 'loyalty',
  'sponsored', 'advertisement', 'ad:', '[ad]',
  'donate', 'charity', 'fundraiser', 'gofundme', 'petition',
  'webinar', 'masterclass', 'free training', 'enroll now',
  'crypto', 'bitcoin', 'forex', 'investment opportunity', 'passive income',
  'singles', 'dating', 'match', 'meet local',
  'pharmacy', 'medication', 'pills', 'supplement',
  'solar panel', 'home security', 'warranty expir',
  'political', 'campaign', 'election', 'vote for',
  'breaking news', 'daily digest', 'weekly roundup', 'top stories',
];

const SPAM_DOMAINS = [
  // Job sites
  'jobcase.com', 'ziprecruiter.com', 'indeed.com', 'glassdoor.com',
  'linkedin.com', 'monster.com', 'careerbuilder.com', 'jobrapido.com',
  // Financial spam
  'creditkarma.com', 'lendingtree.com', 'quickenloans.com',
  'fundflippr.com', 'breatheasyloans.com', 'cashlantic.com',
  // Marketing prefixes
  'noreply@marketing', 'promo@', 'deals@', 'offers@', 'news@',
  'hello@', 'info@', 'newsletter@', 'updates@', 'no-reply@',
  'notifications@', 'notify@', 'mailer@', 'campaign@',
  'bounce@', 'bulk@', 'mass@',
  // Common retail/marketing
  'retailmenot.com', 'groupon.com', 'slickdeals.com',
  'constantcontact.com', 'mailchimp.com', 'sendgrid.net',
  'amazonses.com', 'hubspot.com', 'salesforce.com',
  // Social media notifications
  'facebookmail.com', 'pinterest.com', 'twitter.com', 'tiktok.com',
  'nextdoor.com', 'quora.com', 'reddit.com',
];

// Domains we should NEVER filter as spam
const SAFE_DOMAINS = [
  'pfisd.net', 'caldwell', 'highland', 'mychart',
  'google.com', 'apple.com', 'icloud.com',
  'venmo.com', 'zelle', 'chase.com', 'bankofamerica.com',
  'pediatr', 'dental', 'urgent',
];

export function classifyEmail(subject: string, snippet: string, from: string): string {
  const text = `${subject} ${snippet} ${from}`.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        return rule.category;
      }
    }
  }

  return 'uncategorized';
}

export function isSpam(subject: string, snippet: string, from: string): boolean {
  const text = `${subject} ${snippet} ${from}`.toLowerCase();
  const fromLower = from.toLowerCase();

  // Never filter safe domains
  for (const safe of SAFE_DOMAINS) {
    if (fromLower.includes(safe)) {
      return false;
    }
  }

  // Check spam domains
  for (const domain of SPAM_DOMAINS) {
    if (fromLower.includes(domain)) {
      return true;
    }
  }

  // Instant spam: single keyword match
  for (const keyword of INSTANT_SPAM_KEYWORDS) {
    if (text.includes(keyword)) {
      return true;
    }
  }

  // Regular spam: 2+ keyword matches
  let matchCount = 0;
  for (const keyword of SPAM_KEYWORDS) {
    if (text.includes(keyword)) {
      matchCount++;
      if (matchCount >= 2) return true;
    }
  }

  return false;
}
