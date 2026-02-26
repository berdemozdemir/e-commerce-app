'use client';

import { TFeaturedProduct } from '@/lib/types/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/Carousel';
import Image from 'next/image';
import { isValidImageSrc } from '@/lib/utils';
import { FC } from 'react';
import { paths } from '@/lib/constants/paths';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

type ImagesCarouselProps = {
  products: TFeaturedProduct[];
};

export const ImagesCarousel: FC<ImagesCarouselProps> = ({ products }) => (
  <Carousel
    opts={{ loop: true }}
    plugins={[
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]}
    className="group relative"
  >
    <CarouselContent className="h-48 w-full sm:h-64 md:h-80 lg:h-96">
      {products
        .filter((product) => isValidImageSrc(product.banner))
        .map((product) => (
          <CarouselItem key={product.id} className="relative h-full w-full">
            <Link href={paths.productDetail(product.slug)}>
              <Image
                src={product.banner!}
                alt={product.name}
                fill
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-black/40 px-4 py-2 text-center text-white sm:py-4">
                <h3 className="text-sm font-bold sm:text-lg md:text-2xl">
                  {product.name}
                </h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious className="left-2" />
    <CarouselNext className="right-2" />
  </Carousel>
);
