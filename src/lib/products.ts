import { unstable_cache } from "next/cache"
import { supabase } from "./supabase"
import type { FilterParams, Produkt } from "@/types/product"

const fetchProdukte = async (filters: FilterParams): Promise<Produkt[]> => {
  let query = supabase.from("products").select("*")

  if (filters.material && filters.material.length > 0) {
    query = query.in("material", filters.material)
  }

  if (filters.kategorie && filters.kategorie.length > 0) {
    query = query.in("kategorie", filters.kategorie)
  }

  if (filters.preis) {
    switch (filters.preis) {
      case "unter-50":
        query = query.lt("preis", 50)
        break
      case "50-100":
        query = query.gte("preis", 50).lte("preis", 100)
        break
      case "100-200":
        query = query.gte("preis", 100).lte("preis", 200)
        break
      case "ueber-200":
        query = query.gt("preis", 200)
        break
    }
  }

  switch (filters.sort) {
    case "preis-asc":
      query = query.order("preis", { ascending: true })
      break
    case "preis-desc":
      query = query.order("preis", { ascending: false })
      break
    default:
      query = query.order("erstellt_am", { ascending: false })
  }

  const { data, error } = await query.limit(100)

  if (error) {
    console.error("Supabase error fetching products:", error)
    return []
  }

  return (data ?? []) as Produkt[]
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
