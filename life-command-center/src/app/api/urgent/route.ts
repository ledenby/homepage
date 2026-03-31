import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await prisma.urgentItem.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.urgentItem.create({
    data: {
      icon: body.icon || '📌',
      text: body.text,
      detail: body.detail || '',
      color: body.color || 'yellow',
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.urgentItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
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
