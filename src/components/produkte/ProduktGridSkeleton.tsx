import { Skeleton } from "@/components/ui/skeleton"

export function ProduktGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <Skeleton className="aspect-[3/4] w-full" />
          <div className="mt-3 flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}