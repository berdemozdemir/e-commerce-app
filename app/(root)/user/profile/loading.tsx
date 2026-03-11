import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <Skeleton className="mb-8 h-7 w-48" />

      {/* Profile image area */}
      <div className="mx-auto w-fit space-y-2">
        <Skeleton className="size-32 rounded-full" />
      </div>

      {/* Name field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-40 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex w-full justify-end">
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
