# NETFUND

A Next.js scholarship portal for Nigerian university students with registration, payment, and dashboard flow.

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Paystack

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your environment variables to `.env.local`.
3. Run the Supabase schema in the SQL editor.
4. Start the app:
   ```bash
   npm run dev
   ```

## Environment variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
