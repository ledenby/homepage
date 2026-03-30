import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { del } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uploads = await prisma.upload.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(uploads);
}

export async function POST(req: NextRequest) {
  try {
    const { url, filename, caption = '', category = 'general', notes = '' } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'No blob URL provided' }, { status: 400 });
    }

    const upload = await prisma.upload.create({
      data: {
        filename: filename || 'upload',
        url,
        caption,
        category,
        notes,
      },
    });

    return NextResponse.json(upload);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Save failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const upload = await prisma.upload.findUnique({ where: { id } });
  if (upload) {
    try {
      await del(upload.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } catch {
      // Blob may already be deleted
    }
    await prisma.upload.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
