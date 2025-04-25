'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

type ProductImagesProps = {
  images: string[];
};

export const ProductImages = ({ images }: ProductImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <Image
        src={images[currentIndex]}
        width={800}
        height={800}
        alt="product image"
        className="mb-2 rounded-sm border-2"
      />

      <div className="flex gap-2">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              'cursor-pointer border-2 hover:border-orange-300',
              currentIndex === index && 'border-orange-300',
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image}
              alt="min product image"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
