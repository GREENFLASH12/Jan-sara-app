import { ProduktKarte } from "@/components/produkte/produkt-karte";
import type { Product } from "@/lib/products";

interface ProduktGridProps {
  products: Product[];
  resetUrl: string;
}

export function ProduktGrid({ products, resetUrl }: ProduktGridProps) {
  if (products.length === 0) {
    return <LeerZustand resetUrl={resetUrl} />;
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
      role="list"
      aria-label="Produktliste"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProduktKarte product={product} />
        </div>
      ))}
    </div>
  );
}

function LeerZustand({ resetUrl }: { resetUrl: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <h3 className="font-serif text-xl font-medium mb-2">
        Keine Produkte gefunden
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        F&uuml;r diese Filterkombination gibt es leider keine Treffer. Versuche
        andere Filter oder setze alle zur&uuml;ck.
      </p>
      <a
        href={resetUrl}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Filter zur&uuml;cksetzen
      </a>
    </div>
  );
}
