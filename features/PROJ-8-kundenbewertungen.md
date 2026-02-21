# PROJ-8: Kundenbewertungen pro Produkt

## Overview
Ermöglicht Kunden, Produkte zu bewerten und Rezensionen zu hinterlassen. Bewertungen werden auf der Produktdetailseite angezeigt.

## User Stories

### Als Kunde...
- ... möchte ich ein Produkt mit 1-5 Sternen bewerten, um meine Zufriedenheit auszudrücken.
- ... möchte ich einen kurzen Text zu meiner Bewertung hinzufügen, um anderen Kunden zu helfen.
- ... möchte ich meine Bewertung auch ohne Namen abgeben können (anonym).
- ... möchte ich sehen, wie andere Kunden das Produkt bewertet haben, bevor ich kaufe.

### Als Shop-Betreiber...
- ... möchte ich, dass Bewertungen automatisch auf der Produktseite erscheinen.
- ... möchte ich das Durchschnittsrating auf einen Blick sehen können.

## Functional Requirements

### Bewertung erstellen
- [ ] Sternbewertung: 1-5 Sterne (Pflichtfeld)
- [ ] Textfeld für Bewertungstext: optional, max. 1000 Zeichen
- [ ] Name: optional (anonyme Bewertungen erlaubt)
- [ ] E-Mail: optional (wird nicht öffentlich angezeigt)
- [ ] Datum: automatisch erstellt bei Absendung

### Bewertungen anzeigen
- [ ] Alle Bewertungen auf Produktdetailseite sichtbar
- [ ] Durchschnittsrating mit Sternen anzeigen
- [ ] Anzahl der Bewertungen anzeigen
- [ ] Neueste Bewertungen zuerst anzeigen
- [ ] Anonyme Bewertungen mit "Anonym" label

### Datenmodell (Supabase)
```sql
CREATE TABLE bewertungen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produkt_id TEXT NOT NULL,  -- slug des Produkts
  sterne INTEGER NOT NULL CHECK (sterne >= 1 AND sterne <= 5),
  text TEXT,
  name TEXT,
  email TEXT,  -- nicht öffentlich, nur für intern
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Edge Cases
- Keine Bewertungen vorhanden: "Noch keine Bewertungen" Message anzeigen
- Sehr lange Bewertungen: Auf 1000 Zeichen begrenzen
- Mehrfachbewertungen: Gleiche E-Mail kann mehrere Bewertungen schreiben (keine Einschränkung)

## Dependencies
- Requires: PROJ-2 (Produktdetailseite) - für die Anzeige der Bewertungen
- Requires: Supabase Database - für die Speicherung

## Acceptance Criteria

### Must Have
- [ ] Kunde kann 1-5 Sterne auswählen
- [ ] Kunde kann optional einen Text hinzufügen
- [ ] Kunde kann optional seinen Namen angeben
- [ ] Bewertungen werden in Supabase gespeichert
- [ ] Alle Bewertungen eines Produkts werden auf der Produktdetailseite angezeigt
- [ ] Durchschnittsrating wird berechnet und angezeigt
- [ ] Anonyme Bewertungen werden als "Anonym" angezeigt

### Visual Checkpoints
- [ ] Sterne sind visuell als Rating erkennbar (z.B. gelbe/goldene Sterne)
- [ ] Durchschnittsrating zeigt korrekte Anzahl an Sternen
- [ ] Datum wird in deutschem Format angezeigt (TT.MM.JJJJ)
- [ ] Layout ist responsive auf Mobile und Desktop

---

## Tech Design (Solution Architect)

### A) Component Structure

```
ProduktDetailPage (existiert bereits)
+-- BewertungenSection (neu)
    +-- BewertungenSummary
    |   +-- Durchschnitts-Rating (Sterne + Zahl)
    |   +-- Anzahl Bewertungen
    +-- BewertungenListe
    |   +-- BewertungCard (wiederholt)
    |       +-- Stern-Badge
    |       +-- Name + Datum
    |       +-- Bewertungstext
    +-- BewertungFormular (neu)
        +-- SternAuswahl (1-5)
        +-- Textfeld (optional)
        +-- Name (optional)
        +-- E-Mail (optional)
        +-- Absenden Button
```

### B) Data Model (plain language)

**Bewertungen werden in Supabase gespeichert:**
- Jede Bewertung hat eine eindeutige ID
- Jede Bewertung gehört zu einem Produkt (über Produkt-Slug)
- Sterne: 1-5 (muss ausgefüllt werden)
- Text: Optional, bis 1000 Zeichen
- Name: Optional (wird angezeigt oder "Anonym")
- E-Mail: Optional (wird NICHT öffentlich angezeigt, nur intern)
- Datum: Wird automatisch beim Erstellen gespeichert

**Berechnungen:**
- Durchschnittsrating = Summe aller Sterne / Anzahl Bewertungen

### C) Tech Decisions

**Supabase Database:**
- Wir nutzen die bestehende Supabase-Instanz
- Neue Tabelle `bewertungen` erstellen
- Keine RLS (Row Level Security) nötig, da öffentliche Bewertungen

**Bestehende Components nutzen:**
- `Card` für Bewertungskarten
- `Textarea` für Bewertungstext
- `Input` für Name/E-Mail
- `Button` für Absenden
- Lucide Icons für Sterne (Star)

### D) API Endpoints (Backend)

1. **GET `/api/bewertungen?produkt_id=xyz`**
   - Liest alle Bewertungen für ein Produkt
   - Liefert Array zurück mit allen Feldern

2. **POST `/api/bewertungen`**
   - Erstellt neue Bewertung
   - Validate: Sterne 1-5 (Pflicht), Text max 1000 Zeichen

### E) Dependencies

- Keine neuen npm-Packages nötig
- Bestehende Supabase-Verbindung wird genutzt
- Lucide React (bereits installiert) für Star-Icons

---

## Next Steps

Nach Genehmigung:
1. `/backend` - API Routes und Database Setup erstellen
2. `/frontend` - UI Components bauen
3. `/qa` - Testen
4. `/deploy` - Deployen
