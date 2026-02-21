# PROJ-1: Produktkatalog mit Filterung

## Status: Planned
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

## Dependencies
- Keine (Einstiegspunkt des Shops)

---

## Übersicht

Die zentrale Shop-Seite `/produkte` zeigt alle verfügbaren Produkte in einem Grid. Kunden können nach Material, Kategorie und Preisbereich filtern sowie die Reihenfolge sortieren. Produkte werden aus der Supabase-Datenbank geladen — die Familie pflegt sie selbst ohne Entwicklerhilfe.

---

## Produktdaten-Modell

Jedes Produkt hat folgende Felder:
- **Name** (z.B. „Cashmere-Schal in Sandbeige")
- **Slug** (URL-freundlich, z.B. `cashmere-schal-sandbeige`)
- **Kategorie** (Schals & Tücher / Mützen / Decken & Plaids / Accessoires)
- **Material** (Cashmere / Yak / Schafwolle / Kamelwolle)
- **Preis** (in EUR, z.B. 89.00)
- **Kurzbeschreibung** (1–2 Sätze für die Karte)
- **Hauptbild** (URL, gespeichert in Supabase Storage)
- **Auf Lager** (boolean — ob bestellbar)
- **Neu** (boolean — zeigt Badge "Neu")
- **Erstellt am** (für Sortierung)

---

## User Stories

1. Als **Kundin** möchte ich alle Produkte auf einen Blick sehen, damit ich einen Überblick bekomme was Dulaan anbietet.
2. Als **Kundin** möchte ich nach Material filtern (z.B. „nur Cashmere"), damit ich gezielt das finde was mich interessiert.
3. Als **Kundin** möchte ich nach Kategorie filtern (z.B. „nur Schals"), damit ich nicht durch irrelevante Produkte scrollen muss.
4. Als **Kundin** möchte ich einen Preisbereich auswählen, damit ich Produkte in meinem Budget finde.
5. Als **Kundin** möchte ich die Sortierung ändern (Preis / Neuheit), damit ich das relevanteste Produkt zuerst sehe.
6. Als **Schenkerin** möchte ich auf einem Produkt-Bild direkt den Preis und das Material sehen, damit ich schnell entscheiden kann ob es als Geschenk passt.
7. Als **Familienglied** (Admin) möchte ich Produkte in Supabase anlegen/bearbeiten, ohne Code anfassen zu müssen.

---

## Acceptance Criteria

### Katalog-Seite
- [ ] Route `/produkte` zeigt alle aktiven Produkte als Grid
- [ ] Grid: 1 Spalte auf Mobile (< 640px), 2 Spalten auf Tablet (640–1024px), 3 Spalten auf Desktop (> 1024px)
- [ ] Jede Produktkarte zeigt: Hauptbild, Name, Material, Preis, Badge „Ausverkauft" wenn nicht auf Lager
- [ ] Nicht-verfügbare Produkte werden angezeigt aber als „Ausverkauft" markiert und sind nicht klickbar (kein Checkout möglich)
- [ ] Klick auf Karte → navigiert zur Produktdetailseite `/produkte/[slug]`

### Filter
- [ ] Filter für **Material**: Cashmere, Yak, Schafwolle, Kamelwolle — Mehrfachauswahl möglich
- [ ] Filter für **Kategorie**: Schals & Tücher, Mützen, Decken & Plaids, Accessoires — Mehrfachauswahl möglich
- [ ] Filter für **Preis**: Unter 50 €, 50–100 €, 100–200 €, Über 200 € — Einfachauswahl
- [ ] Aktive Filter werden als Chips/Tags angezeigt mit X zum Entfernen
- [ ] Button „Alle Filter zurücksetzen" löscht alle aktiven Filter
- [ ] Filter-State wird in der URL gespeichert (`?material=cashmere&kategorie=schals`) → direkt verlinkbar & Share-fähig

### Sortierung
- [ ] Dropdown mit Optionen: „Neueste zuerst" (Standard), „Preis: aufsteigend", „Preis: absteigend"
- [ ] Sortierung wirkt sofort ohne Seitenneuladung

### Performance & UX
- [ ] Skeleton-Loading-Cards während Daten geladen werden
- [ ] Leerzustand bei 0 Ergebnissen: Hinweis „Keine Produkte gefunden" + Button „Filter zurücksetzen"
- [ ] Produkte werden server-side gefiltert und sortiert (nicht client-side)
- [ ] Anzahl gefundener Produkte wird angezeigt (z.B. „12 Produkte")
- [ ] Mobile: Filter in einem ausklappbaren Sheet / Drawer (nicht dauerhaft sichtbar)

---

## Edge Cases

- **Keine Produkte in DB:** Leerzustand mit einladendem Text statt leerer Grid
- **Filter ergibt 0 Treffer:** Klarer Hinweis + Reset-Button, kein Fehler
- **Produkt ohne Bild:** Fallback-Platzhalter (Dulaan-Logo oder Beige-Hintergrund)
- **URL mit ungültigem Filter-Wert** (z.B. `?material=unknown`): ungültige Werte werden ignoriert, kein Fehler
- **Alle Produkte ausverkauft:** Shop zeigt sie alle — nur als „Ausverkauft" markiert
- **Sehr langer Produktname:** Text wird abgeschnitten (line-clamp) ohne Layout-Bruch
- **Langsame Verbindung:** Skeleton-Cards erscheinen sofort, Fehler-State nach Timeout

---

## Technical Requirements

- **Datenhaltung:** Supabase PostgreSQL — Tabelle `products`
- **Bilder:** Supabase Storage — Bucket `product-images`
- **Filterung/Sortierung:** Server-seitig via Supabase Query (nicht client-side, für SEO und Performance)
- **URL-State:** Next.js `searchParams` für Filter — jede Filter-Kombination ist direkt verlinkbar
- **Caching:** `unstable_cache` für Produktliste (revalidate: 60s) — Familie pflegt selten
- **SEO:** Seite `<title>` und `<meta description>` für `/produkte`
- **Barrierefreiheit:** Filter-Elemente mit ARIA-Labels, Keyboard-navigierbar

---

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
