"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"

export default function WarenkorbPage() {
  const { items, removeItem, updateMenge, totalPreis } = useCart()

  const formattedTotal = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(totalPreis)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40 mb-6" />
        <h1 className="font-serif text-3xl font-light tracking-wide mb-3">
          Dein Warenkorb ist leer
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Entdecke unsere handverlesenen Wollprodukte aus der Mongolei.
        </p>
        <Button variant="outline" className="rounded-none" asChild>
          <Link href="/produkte">Produkte entdecken</Link>
        </Button>
      </div>
    )
  }

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          name: i.name,
          preis: i.preis,
          menge: i.menge,
          hauptbild_url: i.hauptbild_url,
        })),
      }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-light tracking-wide mb-8">Warenkorb</h1>

      <div className="flex flex-col gap-0">
        {items.map((item) => {
          const itemTotal = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(item.preis * item.menge)

          return (
            <div key={item.produktId}>
              <div className="flex gap-4 py-6">
                {/* Image */}
                <Link
                  href={`/produkte/${item.slug}`}
                  className="relative h-28 w-20 shrink-0 overflow-hidden bg-secondary"
                >
                  {item.hauptbild_url ? (
                    <Image
                      src={item.hauptbild_url}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-[10px] tracking-widest uppercase opacity-20">
                        Dulaan
                      </span>
                    </div>
                  )}
                </Link>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <Link
                      href={`/produkte/${item.slug}`}
                      className="font-serif text-sm font-light leading-snug hover:text-accent transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-[11px] tracking-widest uppercase text-muted-foreground">
                      {item.material}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-none"
                        onClick={() => {
                          if (item.menge <= 1) {
                            removeItem(item.produktId)
                          } else {
                            updateMenge(item.produktId, item.menge - 1)
                          }
                        }}
                        aria-label="Menge verringern"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm tabular-nums">{item.menge}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-none"
                        onClick={() => updateMenge(item.produktId, item.menge + 1)}
                        aria-label="Menge erhöhen"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{itemTotal}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.produktId)}
                        aria-label={`${item.name} entfernen`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm text-muted-foreground">Zwischensumme</span>
          <span className="text-xl font-medium">{formattedTotal}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          inkl. MwSt., zzgl. Versandkosten
        </p>
        <Button
          size="lg"
          className="w-full sm:w-auto rounded-none px-16 tracking-wider uppercase text-sm"
          onClick={handleCheckout}
        >
          Zur Kasse
        </Button>
      </div>
    </div>
  )
}
