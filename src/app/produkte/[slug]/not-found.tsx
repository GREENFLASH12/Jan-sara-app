import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProduktNichtGefunden() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
        Produkt nicht gefunden
      </p>
      <h1 className="font-serif text-3xl font-light tracking-wide mb-3">
        Dieses Produkt existiert leider nicht
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Möglicherweise wurde es entfernt oder der Link ist fehlerhaft.
      </p>
      <Button variant="outline" className="rounded-none" asChild>
        <Link href="/produkte">Zurück zu allen Produkten</Link>
      </Button>
    </div>
  )
}
