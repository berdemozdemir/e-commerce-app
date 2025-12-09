'use client';

import { ProductList } from '@/components/product/ProductList';
import { ProductSkeleton } from '@/components/product/ProductSkeleton';
import { useGetLatestProductsQuery } from '@/lib/services/product';

// TODO: should this page be server component?
export default function Home() {
  const {
    data: latestProducts,
    isLoading,
    error,
  } = useGetLatestProductsQuery();

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <ProductList data={latestProducts || []} title="Newest Ones" limit={6} />
    </>
  );
}
