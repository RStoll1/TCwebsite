import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'RootLayout' });
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 border-b pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold">
            {AppConfig.name}
          </Link>

          <nav>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              <li>
                <Link href="/">{t('home_link')}</Link>
              </li>
              <li>
                <Link href="/about">{t('about_link')}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {props.children}
    </div>
  );
}
