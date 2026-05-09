import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { getProducts } from '@/libs/Commerce';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 300;

export async function generateMetadata(
  props: IndexPageProps
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IndexPageProps) {
  const { locale } = await props.params;
  const products = await getProducts();
  console.log(products);
  setRequestLocale(locale);

  return (
    <>
      <div>
        <iframe
          data-testid="embed-iframe"
          className="mb-4 rounded-l"
          src="https://open.spotify.com/embed/artist/5Nf7KhjJ37M4oFRdMiE935?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
         />
      </div>
      <div className="mx-auto grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,20rem))] justify-center gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
