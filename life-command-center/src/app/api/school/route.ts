import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Filter out events that have already passed
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySortKey = today.toISOString().split('T')[0]; // YYYY-MM-DD

  const events = await prisma.schoolEvent.findMany({
    where: {
      sortKey: { gte: todaySortKey },
    },
    orderBy: { sortKey: 'asc' },
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const event = await prisma.schoolEvent.create({
    data: {
      dateDisplay: body.dateDisplay,
      eventText: body.eventText,
      source: body.source || '',
      type: body.type || 'event',
      sortKey: body.sortKey || '',
    },
  });
  return NextResponse.json(event);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await prisma.schoolEvent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
