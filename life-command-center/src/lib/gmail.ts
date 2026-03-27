import { google } from 'googleapis';

const GMAIL_QUERIES = [
  '(appointment OR schedule OR reminder OR confirm) newer_than:60d -category:promotions -category:social',
  '(cheer OR dance OR gymnastics OR competition OR practice) newer_than:60d -category:promotions',
  '(school OR teacher OR IEP OR ARD OR report card) newer_than:60d -category:promotions',
  '(bill OR payment due OR statement OR invoice OR autopay) newer_than:60d -category:promotions',
  '(doctor OR dentist OR prescription OR pharmacy OR vet) newer_than:60d -category:promotions',
  '(lawn OR repair OR maintenance OR HVAC) newer_than:60d -category:promotions',
  '(insurance OR renters OR lease OR rent OR utility) newer_than:60d -category:promotions',
];

interface GmailMessage {
  messageId: string;
  subject: string;
  from: string;
  snippet: string;
  date: Date;
}

export async function scanGmail(accessToken: string): Promise<GmailMessage[]> {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth });
  const seenIds = new Set<string>();
  const results: GmailMessage[] = [];

  for (const query of GMAIL_QUERIES) {
    try {
      const listResponse = await gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 50,
      });

      const messages = listResponse.data.messages || [];

      for (const msg of messages) {
        if (!msg.id || seenIds.has(msg.id)) continue;
        seenIds.add(msg.id);

        try {
          const detail = await gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
            format: 'metadata',
            metadataHeaders: ['Subject', 'From', 'Date'],
          });

          const headers = detail.data.payload?.headers || [];
          const subject = headers.find((h) => h.name === 'Subject')?.value || '(no subject)';
          const from = headers.find((h) => h.name === 'From')?.value || '';
          const dateStr = headers.find((h) => h.name === 'Date')?.value || '';
          const snippet = detail.data.snippet || '';

          results.push({
            messageId: msg.id,
            subject,
            from,
            snippet,
            date: dateStr ? new Date(dateStr) : new Date(),
          });
        } catch {
          // Skip individual message errors
        }
      }
    } catch {
      // Skip query errors
    }
  }

  return results;
}
