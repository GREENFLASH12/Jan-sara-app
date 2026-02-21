import { Skeleton } from "@/components/ui/skeleton"

export default function ProdukteLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header skeleton */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <Skeleton className="h-9 w-36 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar skeleton — desktop only */}
        <div className="hidden lg:flex flex-col gap-6 w-56 shrink-0">
          <Skeleton className="h-9 w-full" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-2/3" />
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
