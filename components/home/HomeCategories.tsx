'use client';

import Link from 'next/link';
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';
import { ArrowRight } from 'lucide-react';
import { paths } from '@/lib/constants/paths';

const categories = [
  {
    title: 'Electronics',
    image: '/images/categories/electronics.jpg',
    href: `${paths.search.base}?category=electronics`,
    size: 'large', // col-span-2 row-span-2
  },
  {
    title: 'Fashion',
    image: '/images/categories/fashion.jpg',
    href: `${paths.search.base}?category=fashion`,
    size: 'medium', // col-span-1 row-span-1
  },
  {
    title: 'Home & Living',
    image: '/images/categories/home-living.jpg',
    href: `${paths.search.base}?category=home`,
    size: 'medium', // col-span-1 row-span-1
  },
  {
    title: 'Accessories',
    image: '/images/categories/accessories.jpg',
    href: `${paths.search.base}?category=accessories`,
    size: 'wide', // col-span-2 row-span-1
  },
];

export const HomeCategories = () => {
  return (
    <div className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Shop by Category
        </h2>
        <p className="text-muted-foreground mt-4">
          Find exactly what you&apos;re looking for.
        </p>
      </div>

      <StaggerContainer className="grid h-[800px] grid-cols-1 gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-2">
        {categories.map((category) => (
          <StaggerItem
            key={category.title}
            className={`group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 ${
              category.size === 'large'
                ? 'md:col-span-2 md:row-span-2'
                : category.size === 'wide'
                  ? 'md:col-span-2 md:row-span-1'
                  : 'md:col-span-1 md:row-span-1'
            }`}
          >
            <Link href={category.href} className="block h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              />

              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{category.title}</h3>

                <div className="mt-2 flex items-center text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};
