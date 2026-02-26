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
  >
    <CarouselContent className="h-96 w-full">
      {products
        .filter((product) => isValidImageSrc(product.banner))
        .map((product) => (
          <CarouselItem key={product.id} className="relative h-auto w-full">
            <Link href={paths.productDetail(product.slug)}>
              <Image src={product.banner!} alt={product.name} fill />

              <div className="absolute right-[50%] bottom-0 translate-x-[50%] bg-black/40 p-4 text-white">
                <h3 className="text-2xl font-bold">{product.name}</h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
