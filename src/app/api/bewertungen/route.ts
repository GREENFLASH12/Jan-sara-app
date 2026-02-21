import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase"

const bewertungSchema = z.object({
  produkt_id: z.string().min(1, "Produkt-ID ist erforderlich"),
  sterne: z.number().int().min(1).max(5, "Sterne müssen zwischen 1 und 5 liegen"),
  text: z.string().max(1000, "Text darf maximal 1000 Zeichen haben").optional().or(z.literal("")),
  name: z.string().max(100, "Name darf maximal 100 Zeichen haben").optional().or(z.literal("")),
  email: z.string().email("Ungültige E-Mail-Adresse").optional().or(z.literal("")),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const produkt_id = searchParams.get("produkt_id")

    if (!produkt_id) {
      return NextResponse.json(
        { error: "Produkt-ID ist erforderlich" },
        { status: 400 }
      )
    }

    const { data: bewertungen, error } = await supabase
      .from("bewertungen")
      .select("*")
      .eq("produkt_id", produkt_id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Fehler beim Laden der Bewertungen:", error)
      return NextResponse.json(
        { error: "Bewertungen konnten nicht geladen werden" },
        { status: 500 }
      )
    }

    // Calculate average rating
    const totalBewertungen = bewertungen?.length || 0
    const durchschnitt =
      totalBewertungen > 0
        ? bewertungen!.reduce((sum, b) => sum + b.sterne, 0) / totalBewertungen
        : 0

    return NextResponse.json({
      bewertungen: bewertungen || [],
      durchschnitt: Math.round(durchschnitt * 10) / 10,
      anzahl: totalBewertungen,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = bewertungSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Ungültige Eingabe", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { produkt_id, sterne, text, name, email } = result.data

    const { data, error } = await supabase
      .from("bewertungen")
      .insert({
        produkt_id,
        sterne,
        text: text || null,
        name: name || null,
        email: email || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Fehler beim Erstellen der Bewertung:", error)
      return NextResponse.json(
        { error: "Bewertung konnte nicht erstellt werden" },
        { status: 500 }
      )
    }

    return NextResponse.json({ bewertung: data }, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten" },
      { status: 500 }
    )
  }
}
