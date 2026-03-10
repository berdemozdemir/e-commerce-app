import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductList } from '@/components/product/ProductList';
import { getLatestProducts } from '@/lib/actions/product/get-latest-products';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants/product';
import { ImagesCarousel } from '@/components/ImagesCarousel';
import { getFeaturedProducts } from '@/lib/actions/product/get-featured-products';
import { Button } from '@/components/ui/Button';
import { paths } from '@/lib/constants/paths';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { HomePromo } from '@/components/home/HomePromo';
import { HomeCategories } from '@/components/home/HomeCategories';
import { HomeNewsletter } from '@/components/home/HomeNewsletter';
import { FadeIn } from '@/components/motion/FadeIn';

export default async function Home() {
  const [latestErr, latestProducts] = await getLatestProducts();
  const [featuredErr, featuredProducts] = await getFeaturedProducts();

  if (latestErr) {
    console.error('Failed to load latest products:', latestErr);

    return <div>Error loading products</div>;
  }

  return (
    <>
      <FadeIn duration={1} viewportAmount={0.1}>
        <ImagesCarousel products={featuredProducts ?? []} />
      </FadeIn>

      <HomeFeatures />

      <HomeCategories />

      <div className="my-16 space-y-16">
        <ProductList
          data={latestProducts ?? []}
          title="Newest Arrivals"
          limit={LATEST_PRODUCTS_LIMIT}
        />

        <FadeIn>
          <div className="flex justify-center pb-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full border-primary/20 text-lg md:w-auto"
            >
              <Link href={paths.search.base}>
                Explore All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>

      <HomePromo />

      <HomeNewsletter />
    </>
  );
}
