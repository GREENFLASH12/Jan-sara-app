// Product type and filter constants for PROJ-1: Produktkatalog

export interface Product {
  id: string;
  name: string;
  slug: string;
  kategorie: Kategorie;
  material: Material;
  preis: number;
  kurzbeschreibung: string;
  hauptbild: string;
  auf_lager: boolean;
  neu: boolean;
  erstellt_am: string;
}

// --- Filter Constants ---

export const MATERIALS = [
  { value: "cashmere", label: "Cashmere" },
  { value: "yak", label: "Yak" },
  { value: "schafwolle", label: "Schafwolle" },
  { value: "kamelwolle", label: "Kamelwolle" },
] as const;

export const KATEGORIEN = [
  { value: "schals", label: "Schals & T\u00FCcher" },
  { value: "muetzen", label: "M\u00FCtzen" },
  { value: "decken", label: "Decken & Plaids" },
  { value: "accessoires", label: "Accessoires" },
] as const;

export const PREISBEREICHE = [
  { value: "unter-50", label: "Unter 50 \u20AC", min: 0, max: 50 },
  { value: "50-100", label: "50\u2013100 \u20AC", min: 50, max: 100 },
  { value: "100-200", label: "100\u2013200 \u20AC", min: 100, max: 200 },
  { value: "ueber-200", label: "\u00DCber 200 \u20AC", min: 200, max: Infinity },
] as const;

export const SORTIERUNGEN = [
  { value: "neueste", label: "Neueste zuerst" },
  { value: "preis-asc", label: "Preis: aufsteigend" },
  { value: "preis-desc", label: "Preis: absteigend" },
] as const;

export type Material = (typeof MATERIALS)[number]["value"];
export type Kategorie = (typeof KATEGORIEN)[number]["value"];
export type Preisbereich = (typeof PREISBEREICHE)[number]["value"];
export type Sortierung = (typeof SORTIERUNGEN)[number]["value"];

// --- Filter Params from URL ---

export interface FilterParams {
  material: Material[];
  kategorie: Kategorie[];
  preis: Preisbereich | null;
  sort: Sortierung;
}

/**
 * Parse URL search params into typed filter params.
 * Invalid values are silently ignored per spec edge case.
 */
export function parseFilterParams(
  searchParams: Record<string, string | string[] | undefined>
): FilterParams {
  const validMaterials = MATERIALS.map((m) => m.value);
  const validKategorien = KATEGORIEN.map((k) => k.value);
  const validPreise = PREISBEREICHE.map((p) => p.value);
  const validSortierungen = SORTIERUNGEN.map((s) => s.value);

  // Parse comma-separated or repeated params
  const rawMaterial = toArray(searchParams.material);
  const rawKategorie = toArray(searchParams.kategorie);
  const rawPreis =
    typeof searchParams.preis === "string" ? searchParams.preis : null;
  const rawSort =
    typeof searchParams.sort === "string" ? searchParams.sort : null;

  return {
    material: rawMaterial.filter((v): v is Material =>
      validMaterials.includes(v as Material)
    ),
    kategorie: rawKategorie.filter((v): v is Kategorie =>
      validKategorien.includes(v as Kategorie)
    ),
    preis: rawPreis && validPreise.includes(rawPreis as Preisbereich)
      ? (rawPreis as Preisbereich)
      : null,
    sort: rawSort && validSortierungen.includes(rawSort as Sortierung)
      ? (rawSort as Sortierung)
      : "neueste",
  };
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  // Support comma-separated values
  return value.split(",").filter(Boolean);
}

/**
 * Build URL search params string from filter state.
 * Omits empty/default values for clean URLs.
 */
export function buildFilterUrl(params: FilterParams): string {
  const searchParams = new URLSearchParams();

  if (params.material.length > 0) {
    searchParams.set("material", params.material.join(","));
  }
  if (params.kategorie.length > 0) {
    searchParams.set("kategorie", params.kategorie.join(","));
  }
  if (params.preis) {
    searchParams.set("preis", params.preis);
  }
  if (params.sort !== "neueste") {
    searchParams.set("sort", params.sort);
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Filter and sort products based on filter params.
 * This will be replaced by server-side Supabase queries in the backend phase.
 */
export function filterAndSortProducts(
  products: Product[],
  params: FilterParams
): Product[] {
  let filtered = [...products];

  // Material filter
  if (params.material.length > 0) {
    filtered = filtered.filter((p) =>
      params.material.includes(p.material)
    );
  }

  // Kategorie filter
  if (params.kategorie.length > 0) {
    filtered = filtered.filter((p) =>
      params.kategorie.includes(p.kategorie)
    );
  }

  // Preis filter
  if (params.preis) {
    const range = PREISBEREICHE.find((r) => r.value === params.preis);
    if (range) {
      filtered = filtered.filter(
        (p) => p.preis >= range.min && p.preis < range.max
      );
    }
  }

  // Sorting
  switch (params.sort) {
    case "preis-asc":
      filtered.sort((a, b) => a.preis - b.preis);
      break;
    case "preis-desc":
      filtered.sort((a, b) => b.preis - a.preis);
      break;
    case "neueste":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.erstellt_am).getTime() -
          new Date(a.erstellt_am).getTime()
      );
      break;
  }

  return filtered;
}

// --- Helpers ---

export function getMaterialLabel(value: Material): string {
  return MATERIALS.find((m) => m.value === value)?.label ?? value;
}

export function getKategorieLabel(value: Kategorie): string {
  return KATEGORIEN.find((k) => k.value === value)?.label ?? value;
}

export function getPreisLabel(value: Preisbereich): string {
  return PREISBEREICHE.find((p) => p.value === value)?.label ?? value;
}

export function formatPreis(preis: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(preis);
}
