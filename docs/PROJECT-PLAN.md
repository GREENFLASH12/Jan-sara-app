# Dulaan — Project Plan

> Vollständiger Bauplan vom leeren Repo bis zum Live-Shop.
> Jede Phase folgt dem Workflow: `/requirements` → `/architecture` → `/frontend` → `/backend` → `/qa` → `/deploy`

---

## Legende

- `[ ]` — Offen
- `[x]` — Erledigt
- **Skill:** welcher `/skill` aufgerufen wird

---

## Phase 0 — Fundament

> Projekt-Setup, Design-System, Infrastruktur. Einmalig, kein Feature-ID.

- [ ] Design-System definieren (Farben, Fonts, Abstände als Tailwind-Config)
  - Cormorant Garamond (Serif, Headlines) + Inter (Sans, Body) einbinden
  - Farbpalette: `#FAFAF7` Warmweiss, Sandbeige `#D4B896`, Steingrau `#6B6B6B`
- [ ] Supabase-Projekt anlegen + `.env.local` konfigurieren
- [ ] shadcn/ui Basis-Komponenten installieren (Button, Card, Badge, Input, Select, Dialog, Toast)
- [ ] Globales Layout: Header (Logo + Nav) + Footer
- [ ] Favicon + Meta-Tags (OG-Image, Description)
- [ ] `features/INDEX.md` initial befüllen (alle 8 Features eintragen)

---

## Phase 1 — MVP (P0) · Produktkatalog

> PROJ-1: Produkte anzeigen, filtern, suchen.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-1-produktkatalog.md`
- [ ] **Architecture** `/architecture` — Supabase-Schema: `products` Tabelle (name, material, kategorie, preis, bilder, beschreibung, herkunft)
- [ ] **Backend** `/backend` — Supabase Tabelle + RLS + Seed-Daten (5 Beispielprodukte)
- [ ] **Frontend** `/frontend` — Katalog-Seite `/produkte`
  - [ ] Produktkarte (Bild, Name, Material-Badge, Preis)
  - [ ] Filter-Leiste: Material (Cashmere / Yak / Schaf / Kamel), Kategorie, Preis-Range
  - [ ] Leerer Zustand ("Keine Produkte gefunden")
  - [ ] Loading Skeleton
- [ ] **QA** `/qa` — Filter testen, Mobile-Check, RLS verifizieren

---

## Phase 1 — MVP (P0) · Produktdetailseite

> PROJ-2: Produktseite mit Herkunft, Material-Erklärung, Galerie.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-2-produktdetail.md`
- [ ] **Architecture** `/architecture` — Routing `/produkte/[slug]`, Bild-Storage Supabase
- [ ] **Backend** `/backend` — `slug`-Feld in DB, Supabase Storage Bucket für Produktbilder
- [ ] **Frontend** `/frontend` — Detailseite `/produkte/[slug]`
  - [ ] Bildgalerie (Haupt + Thumbnails)
  - [ ] Material-Erklärung (z. B. "Warum Yak-Wolle?")
  - [ ] Herkunfts-Block (Region, Nomaden, Fair Trade)
  - [ ] "In den Warenkorb"-Button
  - [ ] Breadcrumb-Navigation
- [ ] **QA** `/qa` — SEO-Tags, Bildoptimierung, Mobile-Check

---

## Phase 1 — MVP (P0) · Warenkorb & Checkout

> PROJ-3: Gast-Checkout mit Stripe, Bestellbestätigung per E-Mail.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-3-checkout.md`
- [ ] **Architecture** `/architecture` — Stripe Checkout Session, `orders` Tabelle in Supabase
- [ ] **Backend** `/backend`
  - [ ] API Route `/api/checkout` (erstellt Stripe Session)
  - [ ] API Route `/api/webhook` (Stripe Webhook → Bestellung in DB speichern)
  - [ ] `orders` Tabelle mit RLS
- [ ] **Frontend** `/frontend`
  - [ ] Warenkorb-Drawer / Seite (Artikel, Menge, Gesamt)
  - [ ] Checkout-Weiterleitung zu Stripe Hosted Page
  - [ ] Erfolgsseite `/bestellung/danke`
  - [ ] Fehlerseite `/bestellung/fehler`
- [ ] Stripe Test-Modus einrichten + `.env.local.example` aktualisieren
- [ ] **QA** `/qa` — Checkout-Flow E2E, Webhook testen, Fehlerfälle

---

## Phase 2 — Brand (P1) · Unsere Geschichte

> PROJ-4: Markenseite mit Familiengeschichte, Mission, Mongolei-Kontext.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-4-unsere-geschichte.md`
- [ ] **Frontend** `/frontend` — Seite `/ueber-uns`
  - [ ] Hero mit Familienfoto + Tagline
  - [ ] Abschnitt: Die Familie (Text + Foto)
  - [ ] Abschnitt: Die Mongolei (Herkunft, Tradition)
  - [ ] Abschnitt: Unsere Mission (Fair Trade, Qualität)
  - [ ] Timeline: Wie alles begann
- [ ] **QA** `/qa` — Content-Review, Mobile, Accessibility

---

## Phase 2 — Brand (P1) · Materialguide

> PROJ-5: Edukative Seite — Cashmere vs. Yak vs. Schaf vs. Kamel.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-5-materialguide.md`
- [ ] **Frontend** `/frontend` — Seite `/materialguide`
  - [ ] Vergleichstabelle (Weichheit, Wärme, Pflegeaufwand, Preis)
  - [ ] Detail-Karte pro Material mit Bild + Beschreibung
  - [ ] CTA: "Produkte aus [Material] entdecken" → gefilterte Katalogseite
- [ ] **QA** `/qa` — Links zu Katalog testen, Mobile

---

## Phase 2 — Brand (P1) · Marktdaten

> PROJ-6: Wo findet man Dulaan vor Ort? Märkte, Termine, Standorte.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-6-marktdaten.md`
- [ ] **Architecture** `/architecture` — `market_dates` Tabelle (Ort, Datum, Beschreibung)
- [ ] **Backend** `/backend` — Tabelle + RLS + Admin-fähige Pflege
- [ ] **Frontend** `/frontend` — Seite `/maerkte`
  - [ ] Liste kommender Markttermine (chronologisch)
  - [ ] Vergangene Termine ausblenden / einklappen
  - [ ] Karten-Embed (optional: Google Maps Standort)
- [ ] **QA** `/qa` — Termine-Darstellung, Leerer Zustand

---

## Phase 3 — Wachstum (P2) · Newsletter

> PROJ-7: Newsletter-Anmeldung mit automatischer Willkommens-Mail.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-7-newsletter.md`
- [ ] **Architecture** `/architecture` — Mailchimp oder Resend als E-Mail-Provider
- [ ] **Backend** `/backend` — API Route `/api/newsletter`, `subscribers` Tabelle
- [ ] **Frontend** `/frontend`
  - [ ] Newsletter-Banner / Abschnitt auf Startseite
  - [ ] Newsletter-Widget im Footer
  - [ ] Double-Opt-In Bestätigungsseite
- [ ] **QA** `/qa` — E-Mail-Versand testen, DSGVO-Checkbox prüfen

---

## Phase 3 — Wachstum (P2) · Kundenbewertungen

> PROJ-8: Bewertungen pro Produkt anzeigen und erfassen.

- [ ] **Requirements** `/requirements` — Feature-Spec `features/PROJ-8-bewertungen.md`
- [ ] **Architecture** `/architecture` — `reviews` Tabelle (produkt_id, sterne, text, name, verifiziert)
- [ ] **Backend** `/backend` — API Routes für Bewertung anlegen + abrufen, Moderation-Flag
- [ ] **Frontend** `/frontend`
  - [ ] Bewertungs-Liste auf Produktdetailseite (Sterne, Text, Datum)
  - [ ] Bewertungsformular (nach Kauf, per Link aus Bestätigungs-Mail)
  - [ ] Durchschnittsbewertung im Produktkatalog sichtbar
- [ ] **QA** `/qa` — Spam-Schutz, RLS, Moderation-Flow

---

## Phase 4 — Launch

> Technische Abnahme, Produktion, Go-Live.

- [ ] **QA gesamt** `/qa` — End-to-End Smoke-Test aller Features
- [ ] Performance-Audit (Lighthouse ≥ 90 Mobile)
- [ ] SEO-Checkliste: sitemap.xml, robots.txt, Meta-Tags alle Seiten
- [ ] DSGVO: Datenschutzseite, Impressum, Cookie-Hinweis
- [ ] Stripe auf Live-Modus umstellen + Webhook-URL aktualisieren
- [ ] Supabase Production-DB + Backups einrichten
- [ ] **Deploy** `/deploy` — Vercel Production-Deployment
  - [ ] Environment Variables in Vercel gesetzt
  - [ ] Custom Domain verbunden
  - [ ] HTTPS verifiziert
- [ ] Erste 5 echte Produkte eingepflegt
- [ ] Soft-Launch: Link an Familie + enge Bekannte
- [ ] **Go-Live**

---

## Fortschritt

| Phase | Features | Status |
|-------|----------|--------|
| Phase 0 | Fundament | `[ ]` |
| Phase 1 | PROJ-1 Katalog | `[ ]` |
| Phase 1 | PROJ-2 Produktdetail | `[ ]` |
| Phase 1 | PROJ-3 Checkout | `[ ]` |
| Phase 2 | PROJ-4 Geschichte | `[ ]` |
| Phase 2 | PROJ-5 Materialguide | `[ ]` |
| Phase 2 | PROJ-6 Marktdaten | `[ ]` |
| Phase 3 | PROJ-7 Newsletter | `[ ]` |
| Phase 3 | PROJ-8 Bewertungen | `[ ]` |
| Phase 4 | Launch | `[ ]` |
