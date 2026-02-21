"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export default function BestellungErfolgPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />

      <h1 className="font-serif text-3xl font-light tracking-wide mb-3">
        Vielen Dank für deine Bestellung!
      </h1>

      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
        Wir haben deine Bestellung erhalten und werden sie sorgfältig für dich vorbereiten.
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8">
        Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" className="rounded-none" asChild>
          <Link href="/produkte">Weiter einkaufen</Link>
        </Button>
        <Button variant="ghost" className="rounded-none text-muted-foreground" asChild>
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </div>
  )
}
