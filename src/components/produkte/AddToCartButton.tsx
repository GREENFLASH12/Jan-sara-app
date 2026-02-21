"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { Produkt } from "@/types/product"

interface AddToCartButtonProps {
  produkt: Produkt
}

export function AddToCartButton({ produkt }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      produktId: produkt.id,
      name: produkt.name,
      slug: produkt.slug,
      material: produkt.material,
      preis: produkt.preis,
      hauptbild_url: produkt.hauptbild_url,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!produkt.auf_lager) {
    return (
      <Button
        size="lg"
        className="w-full sm:w-auto rounded-none px-12 tracking-wider uppercase text-sm"
        disabled
      >
        Ausverkauft
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto rounded-none px-12 tracking-wider uppercase text-sm"
      onClick={handleAdd}
    >
      {added ? (
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Hinzugefügt
        </span>
      ) : (
        "In den Warenkorb"
      )}
    </Button>
  )
}
