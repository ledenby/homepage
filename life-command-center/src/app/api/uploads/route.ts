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
    const contentType = req.headers.get('content-type') || '';

    // Handle JSON body (metadata-only save from client upload)
    if (contentType.includes('application/json')) {
      const { url, filename, caption = '', category = 'general', notes = '' } = await req.json();
      if (!url) {
        return NextResponse.json({ error: 'No blob URL provided' }, { status: 400 });
      }
      const upload = await prisma.upload.create({
        data: { filename: filename || 'upload', url, caption, category, notes },
      });
      return NextResponse.json(upload);
    }

    // Handle FormData (server-side blob upload)
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const caption = (formData.get('caption') as string) || '';
    const category = (formData.get('category') as string) || 'general';
    const notes = (formData.get('notes') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Blob storage not configured' }, { status: 500 });
    }

    // Read file into buffer to avoid streaming issues
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeName = `uploads/upload-${Date.now()}.${ext}`;

    const blob = await put(safeName, buffer, {
      access: 'public',
      token,
      contentType: file.type || 'image/jpeg',
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
    return NextResponse.json({
      error: error.message || 'Upload failed',
      type: error.name,
    }, { status: 500 });
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
