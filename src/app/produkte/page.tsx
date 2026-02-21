import type { Metadata } from "next"
import { Suspense } from "react"
import { getProdukte } from "@/lib/products"
import { parseFiltersFromSearchParams } from "@/lib/filter-utils"
import { ProduktGridAsync } from "@/components/produkte/ProduktGrid"
import { ProduktGridSkeleton } from "@/components/produkte/ProduktGridSkeleton"
import { FilterLeiste } from "@/components/produkte/FilterLeiste"
import { AktiveFilterChips } from "@/components/produkte/AktiveFilterChips"
import { MobileFilterButton } from "@/components/produkte/MobileFilterButton"

export const metadata: Metadata = {
  title: "Produkte",
  description:
    "Alle handverlesenen Cashmere-, Yak- und Kamelwollprodukte aus der Mongolei. Nachhaltig, authentisch, direkt von unserer Familie.",
}

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ProduktePage({ searchParams }: Props) {
  const params = await searchParams
  const filters = parseFiltersFromSearchParams(params)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header - loads instantly */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide">Produkte</h1>
          <Suspense fallback={<p className="mt-1 text-sm text-muted-foreground">Laden...</p>}>
            <ProdukteCount filters={filters} />
          </Suspense>
        </div>
        <MobileFilterButton filters={filters} />
      </div>

      {/* Active filter chips */}
      <AktiveFilterChips filters={filters} />

      {/* Content */}
      <div className="flex gap-10">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block w-56 shrink-0" aria-label="Filter">
          <FilterLeiste filters={filters} />
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={<ProduktGridSkeleton />}>
            <ProduktGridAsync produktePromise={getProdukte(filters)} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function ProdukteCount({ filters }: { filters: ReturnType<typeof parseFiltersFromSearchParams> }) {
  const produkte = await getProdukte(filters)
  return (
    <p className="mt-1 text-sm text-muted-foreground">
      {produkte.length} {produkte.length === 1 ? "Produkt" : "Produkte"}
    </p>
  )
}
