import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProduktKarte } from "./ProduktKarte"
import type { Produkt } from "@/types/product"

interface ProduktGridProps {
  produkte: Produkt[]
}

export function ProduktGrid({ produkte }: ProduktGridProps) {
  if (produkte.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-xl font-light text-muted-foreground">
          Keine Produkte gefunden
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Versuche andere Filter oder setze alle Filter zurück.
        </p>
        <Button variant="outline" className="mt-6 rounded-none" asChild>
          <Link href="/produkte">Filter zurücksetzen</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {produkte.map((produkt) => (
        <ProduktKarte key={produkt.id} produkt={produkt} />
      ))}
    </div>
  )
}
