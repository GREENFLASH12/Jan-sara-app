export interface CartItem {
  produktId: string
  name: string
  slug: string
  material: string
  preis: number
  hauptbild_url: string | null
  menge: number
}
