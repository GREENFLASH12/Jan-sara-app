import type { FilterParams, Material, Kategorie, PreisRange, Sortierung } from "@/types/product"

export const VALID_MATERIALS: Material[] = ["cashmere", "yak", "schafwolle", "kamelwolle"]
export const VALID_KATEGORIEN: Kategorie[] = ["schals-tuecher", "muetzen", "decken-plaids", "accessoires"]
export const VALID_PREIS_RANGES: PreisRange[] = ["unter-50", "50-100", "100-200", "ueber-200"]
export const VALID_SORTIERUNGEN: Sortierung[] = ["neueste", "preis-asc", "preis-desc"]

export const MATERIAL_LABELS: Record<Material, string> = {
  cashmere: "Cashmere",
  yak: "Yak",
  schafwolle: "Schafwolle",
  kamelwolle: "Kamelwolle",
}

export const KATEGORIE_LABELS: Record<Kategorie, string> = {
  "schals-tuecher": "Schals & Tücher",
  muetzen: "Mützen",
  "decken-plaids": "Decken & Plaids",
  accessoires: "Accessoires",
}

export const PREIS_LABELS: Record<PreisRange, string> = {
  "unter-50": "Unter 50 €",
  "50-100": "50–100 €",
  "100-200": "100–200 €",
  "ueber-200": "Über 200 €",
}

export const MATERIAL_OPTIONS: { value: Material; label: string }[] =
  VALID_MATERIALS.map((v) => ({ value: v, label: MATERIAL_LABELS[v] }))

export const KATEGORIE_OPTIONS: { value: Kategorie; label: string }[] =
  VALID_KATEGORIEN.map((v) => ({ value: v, label: KATEGORIE_LABELS[v] }))

export const PREIS_OPTIONS: { value: PreisRange; label: string }[] =
  VALID_PREIS_RANGES.map((v) => ({ value: v, label: PREIS_LABELS[v] }))

export function parseFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>
): FilterParams {
  const filters: FilterParams = {}

  const materialParam = Array.isArray(params.material) ? params.material[0] : params.material
  if (materialParam) {
    const materials = materialParam
      .split(",")
      .filter((m) => VALID_MATERIALS.includes(m as Material)) as Material[]
    if (materials.length > 0) filters.material = materials
  }

  const kategorieParam = Array.isArray(params.kategorie) ? params.kategorie[0] : params.kategorie
  if (kategorieParam) {
    const kategorien = kategorieParam
      .split(",")
      .filter((k) => VALID_KATEGORIEN.includes(k as Kategorie)) as Kategorie[]
    if (kategorien.length > 0) filters.kategorie = kategorien
  }

  const preisParam = Array.isArray(params.preis) ? params.preis[0] : params.preis
  if (preisParam && VALID_PREIS_RANGES.includes(preisParam as PreisRange)) {
    filters.preis = preisParam as PreisRange
  }

  const sortParam = Array.isArray(params.sort) ? params.sort[0] : params.sort
  if (sortParam && VALID_SORTIERUNGEN.includes(sortParam as Sortierung)) {
    filters.sort = sortParam as Sortierung
  }

  return filters
}

export function buildFilterURL(filters: FilterParams): string {
  const params = new URLSearchParams()

  if (filters.material && filters.material.length > 0) {
    params.set("material", filters.material.join(","))
  }
  if (filters.kategorie && filters.kategorie.length > 0) {
    params.set("kategorie", filters.kategorie.join(","))
  }
  if (filters.preis) {
    params.set("preis", filters.preis)
  }
  if (filters.sort && filters.sort !== "neueste") {
    params.set("sort", filters.sort)
  }

  const str = params.toString()
  return str ? `/produkte?${str}` : "/produkte"
}
