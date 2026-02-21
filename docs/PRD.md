# Product Requirements Document — Dulaan

> **Dulaan** (ᠳᠤᠯᠠᠭᠠᠨ) — Wärme aus der Mongolei, direkt von unserer Familie zu dir.

---

## Vision

Dulaan ist der Online-Shop einer mongolisch-deutschen Familie, die seit Jahren handverlesene Wollprodukte aus der Mongolei auf deutschen Märkten verkauft — jetzt auch digital.

Wir bauen keinen anonymen E-Commerce-Shop. Wir bauen eine digitale Verlängerung des Markterlebnisses: persönlich, ehrlich, warmherzig. Kunden sollen verstehen woher jedes Produkt kommt, wer es hergestellt hat und warum es seinen Preis wert ist.

Das Ziel: Der erste deutschsprachige Online-Shop für authentische mongolische Wollprodukte (Cashmere, Yak, Schaf, Kamel) — mit Slow-Luxury-Positionierung und echter Familiengeschichte dahinter.

---

## Target Users

### Primär — „Die Qualitätsbewusste" (35–55 Jahre)

- Berufstätig, Mittel- bis Oberschicht, kauft bewusst und selten
- Sucht Alternativen zu Fast Fashion, bereit mehr für Langlebigkeit zu zahlen
- Recherchiert ausführlich vor dem Kauf (Material, Herkunft, Bewertungen)
- **Pain Points:** Misstraut Luxusmarken (zu anonym, zu teuer für das was geboten wird), findet kaum authentische Fair-Trade-Quellen für Naturwollprodukte
- **Ziel:** Ein Produkt kaufen, das hält — und hinter dem sie stehen kann

### Sekundär — „Die Schenkerin" (45–65 Jahre)

- Sucht besondere, erklärungswürdige Geschenke zu Geburtstagen / Weihnachten
- Schätzt Verpackung, Geschichte und Herkunft als Teil des Geschenks
- **Pain Points:** Cashmere-Schals überall gleich, keine gute Geschichte dahinter
- **Ziel:** Etwas schenken das wirklich besonders ist — mit Herkunft und Bedeutung

---

## Core Features (Roadmap)

| Priority | Feature | Status |
|----------|---------|--------|
| P0 (MVP) | Produktkatalog mit Filterung (Material, Kategorie, Preis) | Planned |
| P0 (MVP) | Produktdetailseite mit Material-Erklärung & Herkunft | Planned |
| P0 (MVP) | Warenkorb & Checkout (Stripe-Integration) | Planned |
| P1 | Unsere Geschichte — Markenseite (Familie, Mongolei, Mission) | Planned |
| P1 | Materialguide (Cashmere vs. Yak vs. Schaf vs. Kamel) | Planned |
| P1 | Marktdaten-Seite (wo findet man uns vor Ort?) | Planned |
| P2 | Newsletter-Anmeldung mit Willkommens-Mail | Planned |
| P2 | Kundenbewertungen pro Produkt | Planned |

---

## Success Metrics

### Launch (Monat 1–3)

- 50+ Bestellungen im ersten Quartal
- Conversion Rate ≥ 2 % (Besucher → Kauf)
- Ø Bestellwert ≥ 60 €
- Absprungrate < 60 %

### Wachstum (Monat 4–12)

- 200+ Bestellungen pro Quartal
- 30 % wiederkehrende Kunden
- Newsletter: 500+ Abonnenten
- Organischer Traffic: 1.000+ Besucher/Monat (SEO)

---

## Constraints

- **Team:** Kleine Familie — keine dedizierte IT, Inhalte müssen selbst pflegbar sein (CMS)
- **Budget:** Niedrig — Open-Source / günstige SaaS-Tools bevorzugt
- **Sprache:** Nur Deutsch (kein mehrsprachiger Shop in V1)
- **Technologie:** Next.js + Tailwind + shadcn/ui (bereits aufgesetzt), Vercel-Hosting
- **Zahlungsabwicklung:** Stripe (einfach, EU-konform)
- **Produktverwaltung:** Muss ohne Entwickler-Hilfe funktionieren (kein Hardcoding von Produkten)

---

## Non-Goals (V1)

- **Keine Mehrsprachigkeit** — nur Deutsch im ersten Release
- **Keine App** — Mobile-optimierte Website reicht
- **Kein Kundenkonto / Login** — Gast-Checkout ist ausreichend für V1
- **Kein komplexes Lagerverwaltungssystem** — manuelle Pflege ist akzeptabel
- **Kein eigenes Bewertungssystem** — kommt erst in V2
- **Keine Internationalisierung** — nur Versand innerhalb Deutschlands (V1)

---

## Design-Leitlinien (aus Brand DNA)

- **Farben:** Warmes Sandbeige / Kamelton, Steingrau, Warmweiss (#FAFAF7)
- **Typografie:** Serif für Headlines (Cormorant Garamond), Sans-Serif für Text (Inter)
- **Bildsprache:** Authentische Mongolei-Fotos, warme Lichtstimmung, kein Stock-Material
- **Layout:** Viel Weissraum, minimalistisch, Mobile-first
- **Sprache:** Warm, ehrlich, wissensvermittelnd — kein Marketing-Sprech

---

Use `/requirements` to create detailed feature specifications for each item in the roadmap above.
