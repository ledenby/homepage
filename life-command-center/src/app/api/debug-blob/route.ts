import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envKeys = Object.keys(process.env).filter(
    (k) => k.includes('BLOB') || k.includes('blob')
  );

  return NextResponse.json({
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    blobRelatedEnvVars: envKeys,
    tokenLength: process.env.BLOB_READ_WRITE_TOKEN?.length ?? 0,
  });
}
