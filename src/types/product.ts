export type Material = "cashmere" | "yak" | "schafwolle" | "kamelwolle"

export type Kategorie =
  | "schals-tuecher"
  | "muetzen"
  | "decken-plaids"
  | "accessoires"

export type PreisRange = "unter-50" | "50-100" | "100-200" | "ueber-200"

export type Sortierung = "neueste" | "preis-asc" | "preis-desc"

export interface Produkt {
  id: string
  name: string
  slug: string
  kategorie: Kategorie
  material: Material
  preis: number
  kurzbeschreibung: string | null
  hauptbild_url: string | null
  auf_lager: boolean
  neu: boolean
  erstellt_am: string
}

export interface FilterParams {
  material?: Material[]
  kategorie?: Kategorie[]
  preis?: PreisRange
  sort?: Sortierung
}
