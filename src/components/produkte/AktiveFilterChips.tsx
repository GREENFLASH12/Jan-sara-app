"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { buildFilterURL } from "@/lib/filter-utils"
import type { FilterParams, Material, Kategorie } from "@/types/product"

const MATERIAL_LABELS: Record<string, string> = {
  cashmere: "Cashmere",
  yak: "Yak",
  schafwolle: "Schafwolle",
  kamelwolle: "Kamelwolle",
}

const KATEGORIE_LABELS: Record<string, string> = {
  "schals-tuecher": "Schals & Tücher",
  muetzen: "Mützen",
  "decken-plaids": "Decken & Plaids",
  accessoires: "Accessoires",
}

const PREIS_LABELS: Record<string, string> = {
  "unter-50": "Unter 50 €",
  "50-100": "50–100 €",
  "100-200": "100–200 €",
  "ueber-200": "Über 200 €",
}

interface AktiveFilterChipsProps {
  filters: FilterParams
}

export function AktiveFilterChips({ filters }: AktiveFilterChipsProps) {
  const router = useRouter()

  const hasFilters =
    (filters.material && filters.material.length > 0) ||
    (filters.kategorie && filters.kategorie.length > 0) ||
    filters.preis

  if (!hasFilters) return null

  function removeMaterial(material: Material) {
    const next = filters.material?.filter((m) => m !== material) ?? []
    router.push(buildFilterURL({ ...filters, material: next.length > 0 ? next : undefined }))
  }

  function removeKategorie(kategorie: Kategorie) {
    const next = filters.kategorie?.filter((k) => k !== kategorie) ?? []
    router.push(buildFilterURL({ ...filters, kategorie: next.length > 0 ? next : undefined }))
  }

  function removePreis() {
    router.push(buildFilterURL({ ...filters, preis: undefined }))
  }

  function resetAll() {
    router.push(buildFilterURL({ sort: filters.sort }))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {filters.material?.map((m) => (
        <Badge
          key={m}
          variant="secondary"
          className="flex items-center gap-1.5 pr-1.5 rounded-none text-xs"
        >
          {MATERIAL_LABELS[m] ?? m}
          <button
            onClick={() => removeMaterial(m)}
            className="hover:text-foreground transition-colors ml-0.5"
            aria-label={`${MATERIAL_LABELS[m] ?? m} entfernen`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {filters.kategorie?.map((k) => (
        <Badge
          key={k}
          variant="secondary"
          className="flex items-center gap-1.5 pr-1.5 rounded-none text-xs"
        >
          {KATEGORIE_LABELS[k] ?? k}
          <button
            onClick={() => removeKategorie(k)}
            className="hover:text-foreground transition-colors ml-0.5"
            aria-label={`${KATEGORIE_LABELS[k] ?? k} entfernen`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {filters.preis && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 pr-1.5 rounded-none text-xs"
        >
          {PREIS_LABELS[filters.preis] ?? filters.preis}
          <button
            onClick={removePreis}
            className="hover:text-foreground transition-colors ml-0.5"
            aria-label="Preisfilter entfernen"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        onClick={resetAll}
      >
        Alle zurücksetzen
      </Button>
    </div>
  )
}
