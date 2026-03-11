import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <>
      {/* ImagesCarousel skeleton */}
      <Skeleton className="h-48 w-full rounded-md sm:h-64 md:h-80 lg:h-96" />

      {/* HomeFeatures skeleton */}
      <div className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-lg border bg-card p-6"
          >
            <Skeleton className="mb-4 h-12 w-12 rounded-full" />
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* HomeCategories skeleton */}
      <div className="py-16">
        <div className="mb-10 text-center">
          <Skeleton className="mx-auto mb-4 h-9 w-64" />
          <Skeleton className="mx-auto h-5 w-48" />
        </div>
        <div className="grid h-[800px] grid-cols-1 gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`rounded-lg ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* ProductList (Newest Arrivals) skeleton */}
      <div className="my-16 space-y-16">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-full w-full max-w-sm space-y-4 rounded-md border p-2 shadow-md"
              >
                <Skeleton className="h-72 w-full" />
                <div className="flex h-full max-h-80 flex-col">
                  <div>
                    <Skeleton className="mb-1 h-3 w-3/4" />
                    <Skeleton className="mb-1 h-2.5 w-full" />
                    <Skeleton className="h-2.5 w-1/2" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-2 w-10" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore All Products button skeleton */}
        <div className="flex justify-center pb-8">
          <Skeleton className="h-12 w-full rounded-md md:w-48" />
        </div>
      </div>

      {/* HomePromo skeleton */}
      <div className="my-12">
        <div className="flex flex-col items-center justify-center rounded-xl bg-muted/30 p-8 text-center md:p-16">
          <Skeleton className="mb-4 h-10 w-64 md:h-12 md:w-96" />
          <Skeleton className="mb-8 h-6 w-full max-w-xl md:h-7" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
      </div>

      {/* HomeNewsletter skeleton */}
      <div className="py-24">
        <div className="rounded-3xl bg-muted/50 px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Skeleton className="mx-auto h-10 w-64 sm:h-12 sm:w-80" />
            <Skeleton className="mx-auto mt-4 h-5 w-full max-w-xl" />
            <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-full rounded-md sm:w-32" />
            </div>
            <Skeleton className="mx-auto mt-4 h-3 w-48" />
          </div>
        </div>
      </div>
    </>
  );
}
