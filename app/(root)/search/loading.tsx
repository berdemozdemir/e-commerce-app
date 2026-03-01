import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 pr-2">
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />

            <div className="space-y-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-16" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-16" />
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-32" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        {/* Product Grid Skeleton */}
        <div className="grid w-full grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-full w-full max-w-sm space-y-4 rounded-md border p-2 shadow-md"
            >
              <Skeleton className="h-48 w-full" />

              <div className="flex h-full flex-col">
                <div>
                  <Skeleton className="mb-1 h-4 w-3/4" />
                  <Skeleton className="mb-1 h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
