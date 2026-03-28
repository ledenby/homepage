import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await prisma.urgentItem.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, dismissed } = body;

  const item = await prisma.urgentItem.update({
    where: { id },
    data: {
      dismissed,
      dismissedAt: dismissed ? new Date() : null,
    },
  });
  return NextResponse.json(item);
}
