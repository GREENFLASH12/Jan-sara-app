import { Suspense } from "react";
import type { Metadata } from "next";
import { FilterLeiste } from "@/components/produkte/filter-leiste";
import { ProduktGrid } from "@/components/produkte/produkt-grid";
import { ProduktSeiteHeader } from "@/components/produkte/produkt-seite-header";
import { SkeletonGrid } from "@/components/produkte/skeleton-karte";
import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { parseFilterParams, filterAndSortProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produkte",
  description:
    "Handverlesene Cashmere-, Yak-, Schafwoll- und Kamelwollprodukte direkt aus der Mongolei. Entdecke unsere Kollektion.",
};

interface ProdukteSeiteProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProdukteSeite({
  searchParams,
}: ProdukteSeiteProps) {
  const params = await searchParams;
  const filters = parseFilterParams(params);
  const products = filterAndSortProducts(MOCK_PRODUCTS, filters);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ProduktSeiteHeader count={products.length} />

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Filter-Sidebar */}
          <aside className="w-full lg:w-56 lg:flex-shrink-0">
            <Suspense fallback={null}>
              <FilterLeiste currentFilters={filters} />
            </Suspense>
          </aside>

          {/* Produktgrid */}
          <section className="min-w-0 flex-1" aria-label="Produktliste">
            <Suspense fallback={<SkeletonGrid />}>
              <ProduktGrid products={products} resetUrl="/produkte" />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}
