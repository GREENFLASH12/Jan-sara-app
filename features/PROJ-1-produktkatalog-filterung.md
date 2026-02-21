# PROJ-1: Produktkatalog mit Filterung

## Status: In Review
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

### Komponenten-Struktur

```
/produkte  (Server Component — lädt Daten, kennt URL-Filter)
├── ProduktSeiteHeader
│   └── Titel + Produktanzahl ("12 Produkte")
│
├── FilterLeiste  (Desktop — sichtbar als Seitenleiste links)
│   ├── MaterialFilter  (Checkboxen — Mehrfachauswahl)
│   ├── KategorieFilter  (Checkboxen — Mehrfachauswahl)
│   ├── PreisFilter  (Radio-Buttons — Einfachauswahl)
│   └── SortierungDropdown  (Select)
│
├── AktiveFilterChips  (Client — zeigt aktive Filter als Tags mit X)
│   └── "Alle zurücksetzen" Button
│
├── MobileFilterButton  (Client — öffnet Drawer auf Mobile)
│   └── FilterDrawer  (Sheet/Drawer mit selben Filteroptionen)
│
├── ProduktGrid
│   ├── ProduktKarte × n
│   │   ├── Produktbild  (next/image — optimiert, lazy)
│   │   ├── Neu-Badge  (optional)
│   │   ├── Ausverkauft-Badge  (overlay, wenn nicht auf Lager)
│   │   ├── Produktname
│   │   ├── Material-Label
│   │   └── Preis
│   ├── SkeletonKarten  (Lade-Zustand)
│   └── LeerZustand  ("Keine Produkte gefunden" + Reset-Button)
│
└── Klick auf Karte → /produkte/[slug]
```

### Datenfluss

```
1. Kundin öffnet /produkte
        ↓
2. Next.js liest URL-Parameter (z.B. ?material=cashmere&sort=preis-asc)
        ↓
3. Server fragt Supabase: "Gib mir alle Cashmere-Produkte, sortiert nach Preis"
        ↓
4. Supabase gibt gefilterte Liste zurück (Datenbank macht die Arbeit)
        ↓
5. Seite wird fertig gerendert an den Browser geschickt (Google sieht alle Produkte)
        ↓
6. Kundin ändert Filter → URL aktualisiert sich → Schritt 2 wiederholt sich
```

### Datenspeicherung

| Was | Wo | Warum |
|-----|-----|-------|
| Produktdaten | Supabase Datenbank (`products` Tabelle) | Familie kann direkt im Dashboard bearbeiten |
| Produktbilder | Supabase Storage (`product-images` Bucket) | Zentral, sicher, einfach hochzuladen |
| Filter-Zustand | URL (`?material=cashmere&kategorie=schals`) | Direkt verlinkbar, kein Browser-Speicher nötig |

### Wichtigste Entscheidungen

| Entscheidung | Warum |
|---|---|
| Server-seitiges Rendern | Google sieht alle Produkte → SEO. Schnellerer Seitenaufbau. |
| Filter per URL | Kundin kann gefilterte Ansicht als Link teilen oder bookmarken. |
| Filterung in der Datenbank | Supabase liefert nur passende Produkte — skaliert auch bei 1.000+ Produkten. |
| Bildoptimierung via Next.js | Automatisch WebP, skaliert für Mobile/Desktop, lazy loading. |
| 60-Sekunden Cache | Produktliste wird gecacht — Familie ändert selten, spart DB-Abfragen. |
| Kein Admin-Interface in V1 | Familie pflegt direkt im Supabase-Dashboard — kein Extra-Aufwand. |

### Neue Pakete
Keine — alle benötigten Tools sind bereits installiert.

## QA Test Results

**Tested:** 2026-02-21
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Scope:** PROJ-1 (Produktkatalog) + cross-feature regression (PROJ-2 through PROJ-6) + security audit

### Acceptance Criteria Status

#### AC-1: Route `/produkte` zeigt alle aktiven Produkte als Grid
- [x] Route `/produkte` exists and is implemented as a Server Component (`src/app/produkte/page.tsx`)
- [x] Products are fetched from Supabase via `getProdukte()` and passed to `ProduktGrid`
- [x] All products returned by the query are displayed (no client-side filtering)

#### AC-2: Grid: 1 Spalte auf Mobile (< 640px), 2 Spalten auf Tablet (640-1024px), 3 Spalten auf Desktop (> 1024px)
- [x] Grid classes: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (in `ProduktGrid.tsx` line 28)
- [x] Breakpoints match: `sm:` = 640px, `lg:` = 1024px -- aligned with spec

#### AC-3: Jede Produktkarte zeigt: Hauptbild, Name, Material, Preis, Badge "Ausverkauft"
- [x] `ProduktKarte.tsx` renders: Hauptbild (with next/image), Name (h3), Material label, Price (formatted EUR)
- [x] "Ausverkauft" Badge displayed when `!produkt.auf_lager` (line 39-46)
- [x] "Neu" Badge displayed when `produkt.neu` (line 34-37)

#### AC-4: Nicht-verfuegbare Produkte angezeigt aber als "Ausverkauft" markiert und nicht klickbar
- [x] Out-of-stock products render inside a `<div>` with `opacity-60 cursor-not-allowed` instead of a `<Link>` (lines 68-76)
- [x] No navigation link is provided for out-of-stock items

#### AC-5: Klick auf Karte navigiert zur Produktdetailseite `/produkte/[slug]`
- [x] In-stock products are wrapped in `<Link href={/produkte/${produkt.slug}}>` (line 73)

#### AC-6: Filter fuer Material -- Mehrfachauswahl moeglich
- [x] Material filter uses `Checkbox` components with all 4 options: cashmere, yak, schafwolle, kamelwolle
- [x] Toggle logic in `toggleMaterial()` supports multiple selections (array-based)

#### AC-7: Filter fuer Kategorie -- Mehrfachauswahl moeglich
- [x] Kategorie filter uses `Checkbox` components with all 4 options
- [x] Toggle logic in `toggleKategorie()` supports multiple selections (array-based)

#### AC-8: Filter fuer Preis -- Einfachauswahl
- [x] Price filter uses `RadioGroup` (single selection) with options: unter-50, 50-100, 100-200, ueber-200
- [x] "Alle Preise" option included as default

#### AC-9: Aktive Filter als Chips/Tags mit X zum Entfernen
- [x] `AktiveFilterChips.tsx` renders Badge components for each active filter
- [x] Each chip has an X button that removes only that specific filter
- [x] Chips correctly use human-readable labels via `MATERIAL_LABELS`, `KATEGORIE_LABELS`, `PREIS_LABELS`

#### AC-10: Button "Alle Filter zuruecksetzen"
- [x] "Alle zuruecksetzen" Button present in `AktiveFilterChips.tsx` (line 99-106)
- [x] `resetAll()` preserves sort but clears all filters (line 44)

#### AC-11: Filter-State in URL gespeichert
- [x] `buildFilterURL()` in `filter-utils.ts` serializes filters to URL query params
- [x] `parseFiltersFromSearchParams()` reads them back from URL
- [x] Format: `?material=cashmere,yak&kategorie=schals-tuecher&preis=50-100&sort=preis-asc`

#### AC-12: Sortierung Dropdown
- [x] Select component with 3 options: "Neueste zuerst", "Preis: aufsteigend", "Preis: absteigend"
- [x] Default is "neueste" -- sort param omitted from URL when default

#### AC-13: Sortierung wirkt sofort ohne Seitenneuladung
- [x] `router.push()` triggers a client-side navigation (server re-renders with new searchParams)
- [ ] BUG: While navigation is client-side, each filter/sort change triggers a full server component re-render (Next.js streaming). There is no optimistic UI update -- the page content will flicker/reload between filter changes. This is architecturally correct for SSR but may feel slow to users. (See BUG-5)

#### AC-14: Skeleton-Loading-Cards waehrend Daten geladen werden
- [x] `src/app/produkte/loading.tsx` provides skeleton UI during page load via Next.js Suspense

#### AC-15: Leerzustand bei 0 Ergebnissen
- [x] `ProduktGrid.tsx` renders "Keine Produkte gefunden" message with reset button when `produkte.length === 0`
- [x] Reset button links to `/produkte` (clears all filters)

#### AC-16: Produkte werden server-side gefiltert und sortiert
- [x] Filtering done via Supabase queries in `fetchProdukte()` (`products.ts`)
- [x] `.in()`, `.lt()`, `.gte()`, `.lte()`, `.gt()` and `.order()` applied on server

#### AC-17: Anzahl gefundener Produkte angezeigt
- [x] `{produkte.length} Produkte` displayed in page header (line 31 of `produkte/page.tsx`)
- [x] Singular form "Produkt" used when count is 1

#### AC-18: Mobile Filter in ausklappbarem Sheet/Drawer
- [x] `MobileFilterButton.tsx` uses shadcn `Sheet` component (slides from right)
- [x] Button only visible on mobile via `lg:hidden` class
- [x] Active filter count shown as badge on the button

### Edge Cases Status

#### EC-1: Keine Produkte in DB
- [x] Handled: `ProduktGrid` shows empty state message "Keine Produkte gefunden" with "Filter zuruecksetzen" link

#### EC-2: Filter ergibt 0 Treffer
- [x] Same empty state handler applies -- "Keine Produkte gefunden" + reset button

#### EC-3: Produkt ohne Bild
- [x] Handled: `ProduktKarte.tsx` lines 24-30 show a "Dulaan" text placeholder on beige background when `hauptbild_url` is null/empty

#### EC-4: URL mit ungueltigem Filter-Wert
- [x] Handled: `parseFiltersFromSearchParams()` validates against `VALID_MATERIALS`, `VALID_KATEGORIEN`, `VALID_PREIS_RANGES`, `VALID_SORTIERUNGEN` -- invalid values are silently ignored

#### EC-5: Alle Produkte ausverkauft
- [x] All products displayed regardless of stock status; out-of-stock ones marked with "Ausverkauft" badge and rendered non-clickable

#### EC-6: Sehr langer Produktname
- [x] `line-clamp-2` class applied on product name in `ProduktKarte.tsx` (line 55)

#### EC-7: Langsame Verbindung
- [x] Skeleton loading page exists (`loading.tsx`)
- [ ] BUG: No explicit error/timeout state -- if Supabase request fails, `fetchProdukte` returns empty array `[]`, showing "Keine Produkte gefunden" instead of a proper error message. User cannot distinguish between "no products exist" and "something went wrong." (See BUG-3)

### Security Audit Results

- [x] No hardcoded secrets: All API keys use environment variables
- [x] `.env*.local` in `.gitignore`: Secrets not committed to git
- [x] `.env.local.example` uses placeholder values (no real keys)
- [x] Supabase client uses `NEXT_PUBLIC_` anon key (read-only, safe for browser)
- [x] `STRIPE_SECRET_KEY` is server-only (no `NEXT_PUBLIC_` prefix)
- [x] Input validation: Checkout API uses Zod schema (`checkoutSchema`) to validate all input
- [x] No `dangerouslySetInnerHTML` usage anywhere in the codebase
- [x] Supabase queries use parameterized `.in()`, `.eq()`, etc. -- no raw SQL injection risk
- [x] Image URLs validated via `next.config.ts` `remotePatterns` (only `*.supabase.co` allowed)
- [ ] BUG: **CRITICAL** -- Checkout API accepts client-provided prices without server-side verification (See BUG-1)
- [ ] BUG: **HIGH** -- No security headers configured in `next.config.ts` (See BUG-2)
- [ ] BUG: **MEDIUM** -- No rate limiting on `/api/checkout` endpoint (See BUG-6)
- [ ] BUG: **MEDIUM** -- Supabase RLS status unknown -- no RLS policies verified in codebase (See BUG-7)
- [ ] BUG: **LOW** -- Checkout does not verify product existence or stock status in DB before creating Stripe session (See BUG-8)

### Cross-Feature Regression Results (PROJ-2 through PROJ-6)

#### PROJ-2: Produktdetailseite
- [x] `/produkte/[slug]` page renders with breadcrumb, image, info, material section, Herkunft section
- [x] `not-found.tsx` handles invalid slugs
- [x] `loading.tsx` provides skeleton UI
- [x] AddToCartButton correctly disabled for out-of-stock products

#### PROJ-3: Warenkorb & Checkout
- [x] Cart context (`use-cart.tsx`) uses localStorage with proper hydration pattern
- [x] Warenkorb page shows items, quantities, totals
- [x] Checkout API validates with Zod, creates Stripe session
- [x] Success page clears cart
- [ ] BUG: Warenkorb `handleCheckout` has no error handling -- if fetch fails or returns error, nothing happens to the user (See BUG-4)
- [ ] BUG: No loading/disabled state on "Zur Kasse" button during checkout (See BUG-9)

#### PROJ-4: Unsere Geschichte
- [x] `/ueber-uns` renders all content sections, proper metadata
- [x] No issues found

#### PROJ-5: Materialguide
- [x] `/materialguide` renders all 4 materials with details, links to filtered products
- [x] No issues found

#### PROJ-6: Maerkte
- [x] `/maerkte` renders upcoming and past markets, CTA to online shop
- [x] No issues found

#### Footer Regression
- [ ] BUG: Footer link "Kamelwolle" points to `?material=kamel` instead of `?material=kamelwolle` (See BUG-10)
- [ ] BUG: Footer links to `/impressum`, `/datenschutz`, `/agb`, `/versand` which are dead links (404 pages do not exist yet) (See BUG-11)

### Bugs Found

#### BUG-1: Checkout API Accepts Client-Provided Prices (Price Manipulation)
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Add a product to cart (e.g., Cashmere-Schal, 89.00 EUR)
  2. Open browser DevTools, intercept the POST to `/api/checkout`
  3. Modify the `preis` field in the JSON body to `0.01`
  4. Expected: Server verifies price against database before creating Stripe session
  5. Actual: Server uses the client-provided `preis` directly to create `unit_amount` (line 42 of `route.ts`: `unit_amount: Math.round(item.preis * 100)`) without verifying it matches the actual product price in Supabase
- **Impact:** An attacker can purchase any product at any price they choose
- **Priority:** Fix before deployment

#### BUG-2: Missing Security Headers in next.config.ts
- **Severity:** High
- **Steps to Reproduce:**
  1. Load any page in the application
  2. Inspect response headers in DevTools > Network tab
  3. Expected: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security headers present (per `.claude/rules/security.md`)
  4. Actual: None of these headers are configured. `next.config.ts` only has `images.remotePatterns`
- **Impact:** Vulnerable to clickjacking (iframe embedding), MIME sniffing, and missing HSTS
- **Priority:** Fix before deployment

#### BUG-3: No Error State When Supabase Query Fails
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Simulate Supabase being down or connection timeout
  2. Navigate to `/produkte`
  3. Expected: An error message like "Verbindungsproblem -- bitte versuche es erneut"
  4. Actual: `fetchProdukte` catches the error, logs to console, and returns `[]`. The user sees "Keine Produkte gefunden" with a filter-reset button -- misleading when the real issue is a connection failure
- **Impact:** Users cannot distinguish between "no products" and "error loading products"
- **Priority:** Fix before deployment

#### BUG-4: Checkout Has No User-Facing Error Handling
- **Severity:** High
- **Steps to Reproduce:**
  1. Add items to cart, go to `/warenkorb`
  2. Simulate network failure (DevTools > Network > Offline) or Stripe error
  3. Click "Zur Kasse"
  4. Expected: User sees an error message (e.g., toast notification)
  5. Actual: `handleCheckout()` in `warenkorb/page.tsx` does not wrap the fetch in try/catch. If `res.json()` fails or `data.url` is undefined, nothing happens. The user is stuck with no feedback.
- **Impact:** Users who encounter checkout errors get zero feedback -- potential lost sales
- **Priority:** Fix before deployment

#### BUG-5: Filter Changes Cause Full Page Re-render Flicker
- **Severity:** Low
- **Steps to Reproduce:**
  1. Navigate to `/produkte`
  2. Click a material filter checkbox
  3. Expected: Smooth transition with loading indication
  4. Actual: `router.push()` triggers a full server-side re-render. The page shows `loading.tsx` skeleton between each filter change. This is technically correct but creates a jarring UX when rapidly toggling filters.
- **Priority:** Nice to have -- consider using `useTransition` or React `startTransition` for smoother filter transitions

#### BUG-6: No Rate Limiting on Checkout API
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Send hundreds of rapid POST requests to `/api/checkout` from a script
  2. Expected: After N requests, server returns 429 Too Many Requests
  3. Actual: No rate limiting exists. Each request attempts to create a Stripe Checkout session, potentially incurring Stripe API costs and enabling abuse
- **Impact:** API abuse, potential Stripe API quota exhaustion, DDoS vector
- **Priority:** Fix before deployment

#### BUG-7: Supabase RLS Status Unverified
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Check Supabase dashboard for `products` table RLS policies
  2. Expected: RLS enabled with a SELECT policy allowing anonymous reads; no INSERT/UPDATE/DELETE for anon users
  3. Actual: No RLS migration or policy files exist in the codebase. The Supabase anon key is used client-side (via `NEXT_PUBLIC_` prefix). If RLS is not enabled on the `products` table, any user with the anon key could INSERT, UPDATE, or DELETE product records directly via the Supabase REST API.
- **Impact:** Potential data manipulation if RLS is not enabled
- **Priority:** Fix before deployment -- verify and document RLS policies

#### BUG-8: Checkout Does Not Verify Product Existence or Stock
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Add a product to cart
  2. Product goes out of stock (admin marks it `auf_lager: false` in Supabase)
  3. User still has it in cart (localStorage), clicks "Zur Kasse"
  4. Expected: Server checks that each item exists in DB and is `auf_lager: true` before creating Stripe session
  5. Actual: Checkout API (`route.ts`) never queries Supabase -- it trusts the client payload entirely
- **Impact:** Users can check out products that are out of stock or no longer exist
- **Priority:** Fix before deployment

#### BUG-9: No Loading State on "Zur Kasse" Button
- **Severity:** Low
- **Steps to Reproduce:**
  1. Click "Zur Kasse" in the Warenkorb
  2. Expected: Button shows loading spinner/disabled state while waiting for Stripe session URL
  3. Actual: Button stays clickable. Users can click it multiple times, potentially creating duplicate Stripe sessions
- **Impact:** Duplicate checkout sessions, confusing UX
- **Priority:** Fix in next sprint

#### BUG-10: Footer "Kamelwolle" Link Uses Wrong Filter Value
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Scroll to footer, click "Kamelwolle" link under "Shop"
  2. Expected: Navigate to `/produkte?material=kamelwolle` and show camel wool products
  3. Actual: Navigates to `/produkte?material=kamel`. Since "kamel" is not in `VALID_MATERIALS`, `parseFiltersFromSearchParams` silently ignores it. Result: all products are shown unfiltered.
- **File:** `src/components/layout/footer.tsx` line 8: `{ href: "/produkte?material=kamel", label: "Kamelwolle" }` should be `material=kamelwolle`
- **Priority:** Fix before deployment

#### BUG-11: Footer Legal Links Are Dead (404)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Click "Impressum", "Datenschutz", "AGB", or "Versand & Rueckgabe" in the footer
  2. Expected: Either functional pages or clearly planned placeholder pages
  3. Actual: Next.js returns a 404 page. These are legally required pages for a German online shop.
- **Note:** While these pages are not part of PROJ-1, they are legally required for a German e-commerce site (Impressumspflicht, DSGVO). Technically outside PROJ-1 scope but flagged for awareness.
- **Priority:** Fix before deployment (legal requirement)

### Responsive Testing Notes (Code Review)

| Breakpoint | Component | Status |
|---|---|---|
| 375px (Mobile) | Product grid | PASS -- `grid-cols-1` |
| 375px (Mobile) | Filter sidebar | PASS -- hidden via `hidden lg:block` |
| 375px (Mobile) | Mobile filter button | PASS -- visible via `lg:hidden` |
| 375px (Mobile) | Header nav | PASS -- hidden via `hidden md:flex`, hamburger menu shown |
| 768px (Tablet) | Product grid | PASS -- `sm:grid-cols-2` |
| 768px (Tablet) | Filter sidebar | Hidden (only shows at `lg:` = 1024px) |
| 1440px (Desktop) | Product grid | PASS -- `lg:grid-cols-3` |
| 1440px (Desktop) | Filter sidebar | PASS -- visible as left sidebar |

### Cross-Browser Notes (Code Review)

No browser-specific APIs used. All CSS uses standard Tailwind utilities. The following are noted:
- `backdrop-blur` in header uses `supports-[backdrop-filter]` progressive enhancement -- PASS
- `line-clamp-2` has broad browser support -- PASS
- `Intl.NumberFormat` for currency: supported in all modern browsers -- PASS

### Summary

- **Acceptance Criteria:** 17/18 passed (AC-13 partial -- works but has UX flicker)
- **Edge Cases:** 6/7 passed (EC-7 failed -- no error distinction)
- **Bugs Found:** 11 total (1 Critical, 2 High, 4 Medium, 4 Low)
  - Critical: 1 (BUG-1: Price manipulation in checkout)
  - High: 2 (BUG-2: Missing security headers, BUG-4: No checkout error handling)
  - Medium: 4 (BUG-3: No error state, BUG-6: No rate limiting, BUG-7: RLS unverified, BUG-8: No stock verification, BUG-10: Footer wrong link)
  - Low: 4 (BUG-5: Filter flicker, BUG-9: No loading state, BUG-11: Dead legal links)
- **Security:** Issues found (price manipulation, missing headers, no rate limiting, RLS unverified)
- **Production Ready:** NO
- **Recommendation:** Fix BUG-1, BUG-2, BUG-4, BUG-8, and BUG-10 before deployment. Verify BUG-7 (RLS). Address BUG-3, BUG-6 as high priority. BUG-5, BUG-9, BUG-11 can be fixed in next sprint.

## Deployment
_To be added by /deploy_
