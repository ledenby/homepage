import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
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
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.account.findFirst({
        where: { userId: user.id, provider: 'google' },
      });
      (session as any).accessToken = account?.access_token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
