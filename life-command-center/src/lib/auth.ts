import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        // Save/update Gmail account in database
        const email = (profile as any)?.email || token.email;
        if (email) {
          try {
            await prisma.gmailAccount.upsert({
              where: { email },
              update: {
                accessToken: account.access_token || null,
                refreshToken: account.refresh_token || null,
                isActive: true,
              },
              create: {
                email,
                accessToken: account.access_token || null,
                refreshToken: account.refresh_token || null,
              },
            });
          } catch {
            // Don't block auth if DB save fails
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
