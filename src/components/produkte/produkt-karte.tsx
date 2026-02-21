import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { formatPreis, getMaterialLabel } from "@/lib/products";

interface ProduktKarteProps {
  product: Product;
}

export function ProduktKarte({ product }: ProduktKarteProps) {
  const isOutOfStock = !product.auf_lager;

  const cardContent = (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card transition-shadow ${
        isOutOfStock
          ? "opacity-75 cursor-default"
          : "hover:shadow-md cursor-pointer"
      }`}
      aria-label={`${product.name}, ${getMaterialLabel(product.material)}, ${formatPreis(product.preis)}${isOutOfStock ? ", Ausverkauft" : ""}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50">
        <Image
          src={product.hauptbild}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${
            isOutOfStock ? "" : "group-hover:scale-105"
          }`}
          // Fallback handled via onError in a client wrapper if needed;
          // for now, placeholder image is used.
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.neu && (
            <Badge className="bg-accent text-accent-foreground border-0 text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium">
              Neu
            </Badge>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Badge
              variant="secondary"
              className="text-xs tracking-wider uppercase px-3 py-1.5 font-medium border border-border"
            >
              Ausverkauft
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 p-4">
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground">
          {getMaterialLabel(product.material)}
        </p>
        <h3 className="font-serif text-base font-medium leading-snug line-clamp-2 text-foreground">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-foreground mt-1">
          {formatPreis(product.preis)}
        </p>
      </div>
    </article>
  );

  if (isOutOfStock) {
    return cardContent;
  }

  return (
    <Link
      href={`/produkte/${product.slug}`}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      aria-label={`${product.name} anzeigen`}
    >
      {cardContent}
    </Link>
  );
}
