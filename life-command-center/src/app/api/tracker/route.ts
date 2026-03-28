import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await prisma.recurringItem.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.recurringItem.create({
    data: {
      name: body.name,
      icon: body.icon || '📌',
      frequencyMonths: body.frequencyMonths || 0,
      lastDate: body.lastDate ? new Date(body.lastDate) : null,
      provider: body.provider || '',
      notes: body.notes || null,
      sortOrder: body.sortOrder || 99,
    },
  });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, ...data } = body;

  if (data.lastDate) {
    data.lastDate = new Date(data.lastDate);
  }

  const item = await prisma.recurringItem.update({
    where: { id },
    data,
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await prisma.recurringItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
