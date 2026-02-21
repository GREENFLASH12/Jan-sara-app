import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const beispielProdukte = [
  {
    name: "Cashmere-Schal in Sandbeige",
    slug: "cashmere-schal-sandbeige",
    kategorie: "schals-tuecher",
    material: "cashmere",
    preis: 89.0,
    kurzbeschreibung: "Weicher 100% Cashmere-Schal in zeitlosem Sandbeige. Handgefertigt in der Mongolei.",
    hauptbild_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    auf_lager: true,
    neu: true,
  },
  {
    name: "Yak-Wollmütze in Dunkelgrau",
    slug: "yak-muetze-dunkelgrau",
    kategorie: "muetzen",
    material: "yak",
    preis: 45.0,
    kurzbeschreibung: "Warme Yak-Wollmütze für kalte Wintertage. Natürlich temperaturregulierend.",
    hauptbild_url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    auf_lager: true,
    neu: false,
  },
  {
    name: "Kamelwolle Decke in Naturbraun",
    slug: "kamelwolle-decke-naturbraun",
    kategorie: "decken-plaids",
    material: "kamelwolle",
    preis: 220.0,
    kurzbeschreibung: "Edle Kamelwolle-Decke in warmem Naturbraun. Perfekt für gemütliche Abende.",
    hauptbild_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    auf_lager: true,
    neu: true,
  },
  {
    name: "Schafwoll-Plaid in Cremweiss",
    slug: "schafwoll-plaid-cremweiss",
    kategorie: "decken-plaids",
    material: "schafwolle",
    preis: 150.0,
    kurzbeschreibung: "Klassisches Schafwoll-Plaid in elegantem Cremweiss. Vielseitig einsetzbar.",
    hauptbild_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    auf_lager: true,
    neu: false,
  },
  {
    name: "Cashmere-Handschuhe in Anthrazit",
    slug: "cashmere-handschuhe-anthrazit",
    kategorie: "accessoires",
    material: "cashmere",
    preis: 65.0,
    kurzbeschreibung: "Exquisite Cashmere-Handschuhe mit Touchscreen-Funktion.",
    hauptbild_url: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=800&q=80",
    auf_lager: false,
    neu: false,
  },
  {
    name: "Yak-Stirnband in Marineblau",
    slug: "yak-stirnband-marineblau",
    kategorie: "accessoires",
    material: "yak",
    preis: 35.0,
    kurzbeschreibung: "Stylisches Stirnband aus weicher Yak-Wolle.",
    hauptbild_url: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    auf_lager: true,
    neu: true,
  },
]

async function seed() {
  console.log("⬇️ Lösche bestehende Produkte...")
  await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  console.log("⬆️ Füge Beispieldaten ein...")
  const { data, error } = await supabase.from("products").insert(beispielProdukte).select()

  if (error) {
    console.error("❌ Fehler beim Einfügen:", error)
    process.exit(1)
  }

  console.log("✅ Erfolgreich eingefügt:", data?.length, "Produkte")
  console.log("\n📝 Produkte:")
  data?.forEach((p) => console.log(`  - ${p.name} (${p.preis}€)`))
}

seed()