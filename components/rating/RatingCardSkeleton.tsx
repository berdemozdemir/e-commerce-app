import { Skeleton } from "@/components/ui/Skeleton";

export const RatingCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-md border p-4 shadow">
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="size-4" />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};
