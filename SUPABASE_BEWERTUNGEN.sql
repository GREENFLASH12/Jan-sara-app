-- Führe diesen SQL-Code in deiner Supabase SQL Editor aus
-- URL: https://supabase.com/dashboard -> SQL Editor

CREATE TABLE bewertungen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produkt_id TEXT NOT NULL,
  sterne INTEGER NOT NULL CHECK (sterne >= 1 AND sterne <= 5),
  text TEXT,
  name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bewertungen_produkt_id ON bewertungen(produkt_id);