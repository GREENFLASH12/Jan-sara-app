import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonKarte() {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm border border-border/60">
      {/* Image placeholder */}
      <Skeleton className="aspect-[4/5] w-full rounded-none" />

      {/* Info placeholder */}
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-12 mt-1" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
      aria-label="Produkte werden geladen"
      role="status"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonKarte key={i} />
      ))}
      <span className="sr-only">Produkte werden geladen...</span>
    </div>
  );
}
