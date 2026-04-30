import { setRequestLocale } from "next-intl/server";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <div className="mx-auto max-w-7xl px-4 py-8">{props.children}</div>;
}
