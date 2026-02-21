import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { stripe } from "@/lib/stripe"

const lineItemSchema = z.object({
  name: z.string().min(1),
  preis: z.number().positive(),
  menge: z.number().int().positive(),
  hauptbild_url: z.string().url().nullable(),
})

const checkoutSchema = z.object({
  items: z.array(lineItemSchema).min(1).max(50),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = checkoutSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Ungültige Anfrage", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { items } = result.data

    const origin = request.headers.get("origin") ?? "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "de",
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            ...(item.hauptbild_url ? { images: [item.hauptbild_url] } : {}),
          },
          unit_amount: Math.round(item.preis * 100),
        },
        quantity: item.menge,
      })),
      shipping_address_collection: {
        allowed_countries: ["DE"],
      },
      success_url: `${origin}/bestellung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/warenkorb`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Checkout konnte nicht erstellt werden" },
      { status: 500 }
    )
  }
}
