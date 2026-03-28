# Life Command Center

A personal life management PWA for organizing emails, appointments, school calendars, and recurring tasks.

## Setup

1. Create a Google Cloud project and enable the Gmail API
2. Create OAuth 2.0 credentials (Web application type)
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Add Gmail API scope: `https://www.googleapis.com/auth/gmail.readonly`
5. Copy `.env.example` to `.env.local` and fill in values
6. `npm install`
7. `npx prisma db push`
8. `npx prisma db seed`
9. `npm run dev`

## Environment Variables

```
GOOGLE_CLIENT_ID=       # From Google Cloud Console
GOOGLE_CLIENT_SECRET=   # From Google Cloud Console
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=        # Generate with: openssl rand -base64 32
```
