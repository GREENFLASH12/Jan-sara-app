-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT         NOT NULL,
  slug            TEXT         NOT NULL UNIQUE,
  kategorie       TEXT         NOT NULL CHECK (kategorie IN ('schals-tuecher', 'muetzen', 'decken-plaids', 'accessoires')),
  material        TEXT         NOT NULL CHECK (material IN ('cashmere', 'yak', 'schafwolle', 'kamelwolle')),
  preis           NUMERIC(10,2) NOT NULL CHECK (preis > 0),
  kurzbeschreibung TEXT,
  hauptbild_url   TEXT,
  auf_lager       BOOLEAN      NOT NULL DEFAULT true,
  neu             BOOLEAN      NOT NULL DEFAULT false,
  erstellt_am     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access (shop is publicly visible)
CREATE POLICY "products_public_read"
  ON public.products
  FOR SELECT
  USING (true);

-- Indexes for filtering and sorting
CREATE INDEX IF NOT EXISTS products_material_idx    ON public.products (material);
CREATE INDEX IF NOT EXISTS products_kategorie_idx   ON public.products (kategorie);
CREATE INDEX IF NOT EXISTS products_preis_idx       ON public.products (preis);
CREATE INDEX IF NOT EXISTS products_erstellt_am_idx ON public.products (erstellt_am DESC);

-- Sample data for testing (remove before production)
INSERT INTO public.products (name, slug, kategorie, material, preis, kurzbeschreibung, auf_lager, neu) VALUES
  ('Cashmere-Schal in Sandbeige', 'cashmere-schal-sandbeige', 'schals-tuecher', 'cashmere', 129.00, 'Weicher Cashmere-Schal in elegantem Sandbeige — ein zeitloser Begleiter für jede Jahreszeit.', true, true),
  ('Yak-Wollschal Steingrau', 'yak-wollschal-steingrau', 'schals-tuecher', 'yak', 89.00, 'Natürliche Yak-Wolle aus der mongolischen Steppe. Warm, leicht und unvergleichlich weich.', true, false),
  ('Cashmere-Mütze Warmweiss', 'cashmere-muetze-warmweiss', 'muetzen', 'cashmere', 79.00, 'Klassische Cashmere-Mütze in zeitlosem Warmweiss — luxuriöse Wärme für kühle Tage.', true, false),
  ('Kamelwoll-Decke Kamelton', 'kamelwoll-decke-kamelton', 'decken-plaids', 'kamelwolle', 249.00, 'Große Wohndecke aus reiner Kamelwolle. Natürliche Wärme, die tröstet und schützt.', true, true),
  ('Schafwoll-Schal Naturbraun', 'schafwoll-schal-naturbraun', 'schals-tuecher', 'schafwolle', 65.00, 'Rustikaler Schal aus mongolischer Schafwolle — unbehandelt, natürlich, ehrlich.', true, false),
  ('Yak-Mütze Dunkelgrau', 'yak-muetze-dunkelgrau', 'muetzen', 'yak', 69.00, 'Warme Mütze aus feiner Yak-Wolle. Ideal für echte Winterkälte.', false, false);
