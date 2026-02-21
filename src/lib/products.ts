import { unstable_cache } from "next/cache"
import { supabase } from "./supabase"
import type { FilterParams, Produkt } from "@/types/product"

const MOCK_PRODUKTE: Produkt[] = [
  {
    id: "mock-1",
    name: "Cashmere-Schal in Sandbeige",
    slug: "cashmere-schal-sandbeige",
    kategorie: "schals-tuecher",
    material: "cashmere",
    preis: 89.0,
    kurzbeschreibung: "Weicher 100% Cashmere-Schal in zeitlosem Sandbeige. Handgefertigt in der Mongolei.",
    hauptbild_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    auf_lager: true,
    neu: true,
    erstellt_am: "2026-02-15T10:00:00Z",
  },
  {
    id: "mock-2",
    name: "Yak-Wollmütze in Dunkelgrau",
    slug: "yak-muetze-dunkelgrau",
    kategorie: "muetzen",
    material: "yak",
    preis: 45.0,
    kurzbeschreibung: "Warme Yak-Wollmütze für kalte Wintertage. Natürlich temperaturregulierend.",
    hauptbild_url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    auf_lager: true,
    neu: false,
    erstellt_am: "2026-02-10T10:00:00Z",
  },
  {
    id: "mock-3",
    name: "Kamelwolle Decke in Naturbraun",
    slug: "kamelwolle-decke-naturbraun",
    kategorie: "decken-plaids",
    material: "kamelwolle",
    preis: 220.0,
    kurzbeschreibung: "Edle Kamelwolle-Decke in warmem Naturbraun. Perfekt für gemütliche Abende.",
    hauptbild_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    auf_lager: true,
    neu: true,
    erstellt_am: "2026-02-18T10:00:00Z",
  },
  {
    id: "mock-4",
    name: "Schafwoll-Plaid in Cremweiss",
    slug: "schafwoll-plaid-cremweiss",
    kategorie: "decken-plaids",
    material: "schafwolle",
    preis: 150.0,
    kurzbeschreibung: "Klassisches Schafwoll-Plaid in elegantem Cremweiss. Vielseitig einsetzbar.",
    hauptbild_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    auf_lager: true,
    neu: false,
    erstellt_am: "2026-02-05T10:00:00Z",
  },
  {
    id: "mock-5",
    name: "Cashmere-Handschuhe in Anthrazit",
    slug: "cashmere-handschuhe-anthrazit",
    kategorie: "accessoires",
    material: "cashmere",
    preis: 65.0,
    kurzbeschreibung: "Exquisite Cashmere-Handschuhe mit Touchscreen-Funktion.",
    hauptbild_url: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=800&q=80",
    auf_lager: false,
    neu: false,
    erstellt_am: "2026-02-01T10:00:00Z",
  },
  {
    id: "mock-6",
    name: "Yak-Stirnband in Marineblau",
    slug: "yak-stirnband-marineblau",
    kategorie: "accessoires",
    material: "yak",
    preis: 35.0,
    kurzbeschreibung: "Stylisches Stirnband aus weicher Yak-Wolle.",
    hauptbild_url: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    auf_lager: true,
    neu: true,
    erstellt_am: "2026-02-20T10:00:00Z",
  },
]

function filterMockProdukte(produkte: Produkt[], filters: FilterParams): Produkt[] {
  let filtered = [...produkte]

  if (filters.material && filters.material.length > 0) {
    filtered = filtered.filter((p) => filters.material!.includes(p.material))
  }

  if (filters.kategorie && filters.kategorie.length > 0) {
    filtered = filtered.filter((p) => filters.kategorie!.includes(p.kategorie))
  }

  if (filters.preis) {
    switch (filters.preis) {
      case "unter-50":
        filtered = filtered.filter((p) => p.preis < 50)
        break
      case "50-100":
        filtered = filtered.filter((p) => p.preis >= 50 && p.preis <= 100)
        break
      case "100-200":
        filtered = filtered.filter((p) => p.preis >= 100 && p.preis <= 200)
        break
      case "ueber-200":
        filtered = filtered.filter((p) => p.preis > 200)
        break
    }
  }

  switch (filters.sort) {
    case "preis-asc":
      filtered.sort((a, b) => a.preis - b.preis)
      break
    case "preis-desc":
      filtered.sort((a, b) => b.preis - a.preis)
      break
    default:
      filtered.sort((a, b) => new Date(b.erstellt_am).getTime() - new Date(a.erstellt_am).getTime())
  }

  return filtered
}

const fetchProdukte = async (filters: FilterParams): Promise<Produkt[]> => {
  const { data, error } = await supabase.from("products").select("*")

  if (error || !data || data.length === 0) {
    console.log("Using mock data (Supabase unavailable or empty)")
    return filterMockProdukte(MOCK_PRODUKTE, filters)
  }

  let produkte = data as Produkt[]

  if (filters.material && filters.material.length > 0) {
    produkte = produkte.filter((p) => filters.material!.includes(p.material))
  }

  if (filters.kategorie && filters.kategorie.length > 0) {
    produkte = produkte.filter((p) => filters.kategorie!.includes(p.kategorie))
  }

  if (filters.preis) {
    switch (filters.preis) {
      case "unter-50":
        produkte = produkte.filter((p) => p.preis < 50)
        break
      case "50-100":
        produkte = produkte.filter((p) => p.preis >= 50 && p.preis <= 100)
        break
      case "100-200":
        produkte = produkte.filter((p) => p.preis >= 100 && p.preis <= 200)
        break
      case "ueber-200":
        produkte = produkte.filter((p) => p.preis > 200)
        break
    }
  }

  switch (filters.sort) {
    case "preis-asc":
      produkte.sort((a, b) => a.preis - b.preis)
      break
    case "preis-desc":
      produkte.sort((a, b) => b.preis - a.preis)
      break
    default:
      produkte.sort((a, b) => new Date(b.erstellt_am).getTime() - new Date(a.erstellt_am).getTime())
  }

  return produkte.slice(0, 100)
}

const fetchProduktBySlug = async (slug: string): Promise<Produkt | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single()

  if (error || !data) {
    console.log("Using mock product (Supabase unavailable or not found)")
    return MOCK_PRODUKTE.find((p) => p.slug === slug) ?? null
  }

  return data as Produkt
}

export function getProduktBySlug(slug: string): Promise<Produkt | null> {
  return unstable_cache(fetchProduktBySlug, ["produkt", slug], {
    revalidate: 60,
  })(slug)
}

export function getProdukte(filters: FilterParams): Promise<Produkt[]> {
  const cacheKey = [
    "produkte",
    filters.material?.join(",") ?? "",
    filters.kategorie?.join(",") ?? "",
    filters.preis ?? "",
    filters.sort ?? "neueste",
  ]

  return unstable_cache(fetchProdukte, cacheKey, { revalidate: 60 })(filters)
}
