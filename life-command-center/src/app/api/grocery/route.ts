import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await prisma.groceryItem.findMany({
    orderBy: [{ checked: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { name, quantity, category } = await req.json();
  const item = await prisma.groceryItem.create({
    data: { name: name.trim(), quantity: quantity || '', category: category || 'other' },
  });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, checked, name, quantity } = body;
  const item = await prisma.groceryItem.update({
    where: { id },
    data: {
      ...(checked !== undefined && { checked }),
      ...(name !== undefined && { name: name.trim() }),
      ...(quantity !== undefined && { quantity }),
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    await prisma.groceryItem.delete({ where: { id } });
  } else {
    // Clear all checked items
    await prisma.groceryItem.deleteMany({ where: { checked: true } });
  }
  return NextResponse.json({ ok: true });
}
