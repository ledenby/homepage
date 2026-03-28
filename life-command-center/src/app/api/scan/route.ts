import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { scanGmail } from '@/lib/gmail';
import { classifyEmail, isSpam } from '@/lib/classifier';

export const dynamic = 'force-dynamic';

export async function POST() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const accessToken = (session as any).accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: 'No Gmail access token' }, { status: 401 });
  }

  try {
    const messages = await scanGmail(accessToken);
    const batchId = new Date().toISOString();
    let spamCount = 0;
    let savedCount = 0;

    for (const msg of messages) {
      const spam = isSpam(msg.subject, msg.snippet, msg.from);
      if (spam) {
        spamCount++;
        continue;
      }

      const category = classifyEmail(msg.subject, msg.snippet, msg.from);

      await prisma.scannedEmail.upsert({
        where: { messageId: msg.messageId },
        update: {
          subject: msg.subject,
          fromAddr: msg.from,
          snippet: msg.snippet,
          emailDate: msg.date,
          category,
          isSpam: spam,
          scanBatch: batchId,
          scannedAt: new Date(),
        },
        create: {
          messageId: msg.messageId,
          subject: msg.subject,
          fromAddr: msg.from,
          snippet: msg.snippet,
          emailDate: msg.date,
          category,
          isSpam: spam,
          scanBatch: batchId,
        },
      });
      savedCount++;
    }

    return NextResponse.json({ savedCount, spamCount, batchId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Scan failed' }, { status: 500 });
  }
}

export async function GET() {
  const emails = await prisma.scannedEmail.findMany({
    where: { isSpam: false },
    orderBy: { emailDate: 'desc' },
  });
  return NextResponse.json(emails);
}
