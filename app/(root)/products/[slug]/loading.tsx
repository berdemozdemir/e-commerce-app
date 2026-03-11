import { Skeleton } from '@/components/ui/Skeleton';
import { RatingCardSkeleton } from '@/components/rating/RatingCardSkeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      {/* Product detail skeleton - matches ProductDetail grid layout */}
      <div className="grid w-full grid-cols-1 md:grid-cols-5">
        {/* Image area */}
        <div className="col-span-5 lg:col-span-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>

        {/* Info area */}
        <div className="col-span-5 flex flex-col gap-6 p-5 lg:col-span-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 w-28 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Sidebar - price, status, add to cart */}
        <div className="col-span-5 h-fit space-y-3 rounded-lg border-2 border-muted p-4 lg:col-span-1">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Rating section skeleton */}
      <div>
        <div className="mb-4 flex items-center gap-10">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <RatingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
