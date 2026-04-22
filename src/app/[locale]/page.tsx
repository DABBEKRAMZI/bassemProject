// app/[locale]/page.tsx
import { redirect } from 'next/navigation';

export default async function RootPage({
  params,
}: {
  params: Promise<{ locale: string }>;  // ← now a Promise in Next.js 15
}) {
  const { locale } = await params;  // ← must await it
  redirect(`/${locale}/home`);
}