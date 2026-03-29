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

const SPAM_KEYWORDS = [
  'collection', 'debt', 'past due notice', 'final notice', 'act now',
  'limited time', "congratulations you've won", 'claim your prize',
  'unsubscribe', 'marketing', 'promotional', 'newsletter',
  'bill collector', 'account in default', 'wage garnishment',
  'pre-approved', 'refinance offer', 'survey invitation',
  'recruiting', 'job opportunity', 'career opportunity', 'we are hiring',
  'talent acquisition', 'staffing', 'headhunter', 'job alert',
  'apply now', 'job opening', 'resume', 'we found your resume',
  'credit score', 'credit repair', 'consolidation', 'settlement offer',
  'payment plan offer', 'collections agency', 'overdue account',
  'urgent response required', 'debt relief', 'loan offer', 'cash advance',
  'account suspended', 'verify your account', 'wire transfer',
  'weight loss', 'discount code', 'coupon', 'deal of the day',
  'buy now', 'order now', 'special offer', 'exclusive deal',
  'earn money', 'work from home', 'click here', 'free gift',
  'you have been selected', 'winner', 'inheritance', 'beneficiary',
  'collections department', 'legal action', 'warrant',
];

const SPAM_DOMAINS = [
  'fundflippr.com', 'breatheasyloans.com', 'cashlantic.com',
  'jobcase.com', 'ziprecruiter.com', 'indeed.com', 'glassdoor.com',
  'linkedin.com', 'monster.com', 'careerbuilder.com',
  'jobrapido.com', 'creditkarma.com', 'lendingtree.com', 'quickenloans.com',
  'noreply@marketing', 'promo@', 'deals@', 'offers@',
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

  // Check spam domains
  for (const domain of SPAM_DOMAINS) {
    if (from.toLowerCase().includes(domain)) {
      return true;
    }
  }

  // Check if 2+ spam keywords match
  let matchCount = 0;
  for (const keyword of SPAM_KEYWORDS) {
    if (text.includes(keyword)) {
      matchCount++;
      if (matchCount >= 2) return true;
    }
  }

  return false;
}
