"use client"

import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  buildFilterURL,
  MATERIAL_OPTIONS,
  KATEGORIE_OPTIONS,
  PREIS_OPTIONS,
} from "@/lib/filter-utils"
import type { FilterParams, Material, Kategorie, PreisRange, Sortierung } from "@/types/product"

interface FilterLeisteProps {
  filters: FilterParams
}

export function FilterLeiste({ filters }: FilterLeisteProps) {
  const router = useRouter()

  function toggleMaterial(material: Material) {
    const current = filters.material ?? []
    const next = current.includes(material)
      ? current.filter((m) => m !== material)
      : [...current, material]
    router.push(buildFilterURL({ ...filters, material: next.length > 0 ? next : undefined }))
  }

  function toggleKategorie(kategorie: Kategorie) {
    const current = filters.kategorie ?? []
    const next = current.includes(kategorie)
      ? current.filter((k) => k !== kategorie)
      : [...current, kategorie]
    router.push(buildFilterURL({ ...filters, kategorie: next.length > 0 ? next : undefined }))
  }

  function setPreis(value: string) {
    const preis = value === "alle" ? undefined : (value as PreisRange)
    router.push(buildFilterURL({ ...filters, preis }))
  }

  function setSortierung(sort: Sortierung) {
    router.push(buildFilterURL({ ...filters, sort }))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Sortierung */}
      <div>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
          Sortierung
        </p>
        <Select
          value={filters.sort ?? "neueste"}
          onValueChange={(v) => setSortierung(v as Sortierung)}
        >
          <SelectTrigger className="w-full rounded-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neueste">Neueste zuerst</SelectItem>
            <SelectItem value="preis-asc">Preis: aufsteigend</SelectItem>
            <SelectItem value="preis-desc">Preis: absteigend</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Material */}
      <div>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
          Material
        </p>
        <div className="flex flex-col gap-3">
          {MATERIAL_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`material-${opt.value}`}
                checked={filters.material?.includes(opt.value) ?? false}
                onCheckedChange={() => toggleMaterial(opt.value)}
                aria-label={opt.label}
              />
              <Label
                htmlFor={`material-${opt.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Kategorie */}
      <div>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
          Kategorie
        </p>
        <div className="flex flex-col gap-3">
          {KATEGORIE_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`kategorie-${opt.value}`}
                checked={filters.kategorie?.includes(opt.value) ?? false}
                onCheckedChange={() => toggleKategorie(opt.value)}
                aria-label={opt.label}
              />
              <Label
                htmlFor={`kategorie-${opt.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Preis */}
      <div>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
          Preis
        </p>
        <RadioGroup value={filters.preis ?? "alle"} onValueChange={setPreis}>
          <div className="flex items-center gap-2.5">
            <RadioGroupItem value="alle" id="preis-alle" />
            <Label htmlFor="preis-alle" className="text-sm font-normal cursor-pointer">
              Alle Preise
            </Label>
          </div>
          {PREIS_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2.5">
              <RadioGroupItem value={opt.value} id={`preis-${opt.value}`} />
              <Label
                htmlFor={`preis-${opt.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
