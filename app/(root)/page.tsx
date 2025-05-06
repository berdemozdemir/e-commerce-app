'use client';
// TODO: use this page as server component
// client should be child and use hydration wrapper from tanstack
import { ProductList } from '@/components/product/ProductList';
import { ProductSkeleton } from '@/components/product/ProductSkeleton';
import { useGetLatestProductsQuery } from '@/lib/services/product';

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
