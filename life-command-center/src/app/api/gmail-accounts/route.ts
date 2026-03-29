import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const accounts = await prisma.gmailAccount.findMany({
    orderBy: { addedAt: 'asc' },
    select: {
      id: true,
      email: true,
      lastScanAt: true,
      isActive: true,
      addedAt: true,
    },
  });
  return NextResponse.json(accounts);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  // Also delete scanned emails from this account
  const account = await prisma.gmailAccount.findUnique({ where: { id } });
  if (account) {
    await prisma.scannedEmail.deleteMany({ where: { sourceEmail: account.email } });
    await prisma.gmailAccount.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
