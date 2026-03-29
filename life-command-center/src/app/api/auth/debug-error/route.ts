import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const error = searchParams.get('error');

  return NextResponse.json({
    error,
    message: 'NextAuth error details',
    allParams: Object.fromEntries(searchParams.entries()),
    env: {
      hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      clientIdPrefix: process.env.GOOGLE_CLIENT_ID?.substring(0, 10) + '...',
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      secretLength: process.env.GOOGLE_CLIENT_SECRET?.length,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
    },
  });
}
