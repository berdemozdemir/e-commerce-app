import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton className="h-96 w-full rounded-md" />

      <div className="my-10">
        <h1 className="mb-4 text-center text-2xl font-bold sm:text-start">
          Newest Ones
        </h1>

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
    </>
  );
}
