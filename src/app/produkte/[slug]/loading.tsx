import { Skeleton } from "@/components/ui/skeleton"

export default function ProduktDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image skeleton */}
        <Skeleton className="aspect-[3/4] w-full" />

        {/* Info skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-3 w-32 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-3 w-48 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6 mb-8" />
          <Skeleton className="h-12 w-48 mb-8" />
          <Skeleton className="h-px w-full mb-8" />
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}
