import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uploads = await prisma.upload.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(uploads);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string || '';
    const category = formData.get('category') as string || 'general';
    const notes = formData.get('notes') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
    });

    const upload = await prisma.upload.create({
      data: {
        filename: file.name,
        url: blob.url,
        caption,
        category,
        notes,
      },
    });

    return NextResponse.json(upload);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const upload = await prisma.upload.findUnique({ where: { id } });
  if (upload) {
    try {
      await del(upload.url);
    } catch {
      // Blob may already be deleted
    }
    await prisma.upload.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
