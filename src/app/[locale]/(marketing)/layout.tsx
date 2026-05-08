import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/libs/I18nNavigation";
import { AppConfig } from "@/utils/AppConfig";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "RootLayout" });
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 border-b pb-4">
        <div className="flex flex-wrap flex-col items-center justify-between gap-4">
          <Link
            href="/"
            className="text-3xl !text-white drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] font-bold color"
          >
            {AppConfig.name}
          </Link>

          <nav>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              <li>
                <Link
                  className="!text-white drop-shadow-[0_0_8px_rgba(34,197,94,1.2)] relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-green-500 after:transition-all hover:after:w-full"
                  href="/"
                >
                  {t("home_link")}
                </Link>
              </li>
              <li>
                <Link
                  className="!text-white drop-shadow-[0_0_8px_rgba(34,197,94,1.2)] relative after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-0 after:bg-green-500 after:transition-all hover:after:w-full"
                  href="/about"
                >
                  {t("about_link")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {props.children}
    </div>
  );
}
