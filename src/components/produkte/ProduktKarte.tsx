import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Produkt } from "@/types/product"

const MATERIAL_LABELS: Record<string, string> = {
  cashmere: "Cashmere",
  yak: "Yak",
  schafwolle: "Schafwolle",
  kamelwolle: "Kamelwolle",
}

interface ProduktKarteProps {
  produkt: Produkt
}

export function ProduktKarte({ produkt }: ProduktKarteProps) {
  const content = (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {produkt.hauptbild_url ? (
          <Image
            src={produkt.hauptbild_url}
            alt={produkt.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-lg tracking-widest uppercase opacity-20 text-foreground">
              Dulaan
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {produkt.neu && (
            <Badge className="rounded-none px-2 py-0.5 text-[10px] tracking-widest uppercase bg-foreground text-background">
              Neu
            </Badge>
          )}
          {!produkt.auf_lager && (
            <Badge
              variant="secondary"
              className="rounded-none px-2 py-0.5 text-[10px] tracking-widest uppercase"
            >
              Ausverkauft
            </Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground">
          {MATERIAL_LABELS[produkt.material] ?? produkt.material}
        </p>
        <h3 className="font-serif text-base font-light leading-snug line-clamp-2">
          {produkt.name}
        </h3>
        <p className="text-sm font-medium">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(produkt.preis)}
        </p>
      </div>
    </div>
  )

  if (!produkt.auf_lager) {
    return <div className="opacity-60 cursor-not-allowed">{content}</div>
  }

  return (
    <Link href={`/produkte/${produkt.slug}`} className="block">
      {content}
    </Link>
  )
}
