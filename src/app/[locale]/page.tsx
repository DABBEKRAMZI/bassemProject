// app/[locale]/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // Redirect /en/ to /en/home
  redirect(`/${locale}/home`);
}