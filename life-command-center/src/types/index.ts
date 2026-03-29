export interface EmailResult {
  id: string;
  messageId: string;
  subject: string;
  fromAddr: string;
  snippet: string;
  emailDate: string;
  category: string;
  isSpam: boolean;
}

export interface RecurringItemType {
  id: string;
  name: string;
  icon: string;
  frequencyMonths: number;
  lastDate: string | null;
  provider: string;
  notes: string | null;
  sortOrder: number;
}

export interface UrgentItemType {
  id: string;
  icon: string;
  text: string;
  detail: string;
  color: string;
  dismissed: boolean;
  dismissedAt: string | null;
}

export interface SchoolEventType {
  id: string;
  dateDisplay: string;
  eventText: string;
  source: string;
  type: string;
}

export type TabId = 'now' | 'tracker' | 'school' | 'kids' | 'bills' | 'other' | 'ideas' | 'uploads';

export interface GmailAccountType {
  id: string;
  email: string;
  lastScanAt: string | null;
  isActive: boolean;
}

export interface UploadType {
  id: string;
  filename: string;
  url: string;
  caption: string;
  category: string;
  notes: string;
  createdAt: string;
}

export interface TrackerStatus {
  label: string;
  color: 'red' | 'yellow' | 'green' | 'gray';
}
