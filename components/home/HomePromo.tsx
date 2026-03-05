import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { paths } from '@/lib/constants/paths';
import { FadeIn } from '@/components/motion/FadeIn';

export const HomePromo = () => {
  return (
    <div className="my-12">
      <FadeIn>
        <div className="bg-primary/5 relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-8 text-center md:p-16">
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Spring Collection 2026
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl text-lg md:text-xl">
              Discover the latest trends in fashion and explore our new
              collection. Limited time offer: Get 20% off on all new arrivals.
            </p>
            <Button size="lg" asChild className="h-12 px-8 text-lg">
              <Link href={paths.search.base}>Shop Now</Link>
            </Button>
          </div>

          {/* Abstract background shapes */}
          <div className="bg-primary/5 absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
          <div className="bg-primary/5 absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl" />
        </div>
      </FadeIn>
    </div>
  );
};
