import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { scanGmail } from '@/lib/gmail';
import { classifyEmail, isSpam } from '@/lib/classifier';

export const dynamic = 'force-dynamic';

async function scanAccount(accessToken: string, sourceEmail: string) {
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
        sourceEmail,
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
        sourceEmail,
      },
    });
    savedCount++;
  }

  return { savedCount, spamCount };
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all active Gmail accounts from database
    const accounts = await prisma.gmailAccount.findMany({
      where: { isActive: true },
    });

    // Also include the current session's token for the signed-in account
    const currentEmail = session.user?.email || '';
    const currentToken = (session as any).accessToken;

    let totalSaved = 0;
    let totalSpam = 0;
    const scannedAccounts: string[] = [];

    // Scan current session account
    if (currentToken) {
      try {
        const result = await scanAccount(currentToken, currentEmail);
        totalSaved += result.savedCount;
        totalSpam += result.spamCount;
        scannedAccounts.push(currentEmail);

        // Update last scan time
        if (currentEmail) {
          await prisma.gmailAccount.updateMany({
            where: { email: currentEmail },
            data: { lastScanAt: new Date() },
          });
        }
      } catch (error: any) {
        // Log but continue with other accounts
        console.error(`Failed to scan ${currentEmail}:`, error.message);
      }
    }

    // Scan other stored accounts that have tokens
    for (const account of accounts) {
      if (account.email === currentEmail) continue; // Already scanned
      if (!account.accessToken) continue;

      try {
        const result = await scanAccount(account.accessToken, account.email);
        totalSaved += result.savedCount;
        totalSpam += result.spamCount;
        scannedAccounts.push(account.email);

        await prisma.gmailAccount.update({
          where: { id: account.id },
          data: { lastScanAt: new Date() },
        });
      } catch (error: any) {
        console.error(`Failed to scan ${account.email}:`, error.message);
      }
    }

    return NextResponse.json({
      savedCount: totalSaved,
      spamCount: totalSpam,
      scannedAccounts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Scan failed' }, { status: 500 });
  }
}

export async function GET() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const emails = await prisma.scannedEmail.findMany({
    where: {
      isSpam: false,
      emailDate: { gte: thirtyDaysAgo },
    },
    orderBy: { emailDate: 'desc' },
  });
  return NextResponse.json(emails);
}
