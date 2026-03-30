import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET() {
  const uploads = await prisma.upload.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(uploads);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file: base64Data, filename, caption = '', category = 'general', notes = '' } = body;

    if (!base64Data) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Blob storage not configured. Set BLOB_READ_WRITE_TOKEN in Vercel env vars.' }, { status: 500 });
    }

    // Extract the binary data from the base64 data URL
    const base64 = base64Data.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    // Determine content type from data URL
    const contentType = base64Data.split(';')[0].split(':')[1] || 'image/jpeg';

    const ext = filename?.split('.').pop()?.toLowerCase() || 'jpg';
    const safeName = `upload-${Date.now()}.${ext}`;

    const blob = await put(safeName, buffer, {
      access: 'private',
      token,
      contentType,
    });

    const upload = await prisma.upload.create({
      data: {
        filename: filename || safeName,
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
      name: error.name,
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
