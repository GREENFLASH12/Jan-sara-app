import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Märkte",
  description:
    "Besuche uns vor Ort — auf Weihnachtsmärkten, Handwerkermärkten und anderen Veranstaltungen in Deutschland.",
}

interface Markt {
  name: string
  ort: string
  zeitraum: string
  beschreibung: string
}

const AKTUELLE_MAERKTE: Markt[] = [
  {
    name: "Nürnberger Christkindlesmarkt",
    ort: "Nürnberg, Hauptmarkt",
    zeitraum: "29. Nov – 24. Dez 2026",
    beschreibung:
      "Unser Stammplatz seit Jahren. Besuche uns in der Budenreihe am Schönen Brunnen.",
  },
  {
    name: "Münchner Christkindlmarkt",
    ort: "München, Marienplatz",
    zeitraum: "25. Nov – 24. Dez 2026",
    beschreibung:
      "Zum ersten Mal dabei — mit einer Auswahl unserer beliebtesten Cashmere- und Yak-Produkte.",
  },
  {
    name: "Handwerkermarkt Rothenburg ob der Tauber",
    ort: "Rothenburg ob der Tauber, Marktplatz",
    zeitraum: "6.–8. Nov 2026",
    beschreibung:
      "Ein Wochenende voller Handwerkskunst. Wir sind mit unserem vollen Sortiment vor Ort.",
  },
]

const VERGANGENE_MAERKTE: Markt[] = [
  {
    name: "Ostermarkt Nürnberg",
    ort: "Nürnberg, Hauptmarkt",
    zeitraum: "28. Mär – 12. Apr 2026",
    beschreibung: "Frühlingsstimmung mit leichten Schals und Tüchern aus Cashmere.",
  },
]

function MarktKarte({ markt }: { markt: Markt }) {
  return (
    <Card className="rounded-none border-border/60">
      <CardContent className="p-6">
        <h3 className="font-serif text-lg font-light tracking-wide mb-2">{markt.name}</h3>
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {markt.ort}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {markt.zeitraum}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{markt.beschreibung}</p>
      </CardContent>
    </Card>
  )
}

export default function MaerktePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-4">
        Märkte & Veranstaltungen
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-light leading-tight tracking-wide mb-6">
        Besuche uns vor Ort
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground mb-12">
        Neben unserem Online-Shop sind wir regelmäßig auf Märkten in ganz Deutschland
        unterwegs. Komm vorbei, fühle die Qualität unserer Produkte und lass dich persönlich
        beraten.
      </p>

      {/* Aktuelle Märkte */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-light tracking-wide mb-6">
          Kommende Termine
        </h2>
        <div className="flex flex-col gap-4">
          {AKTUELLE_MAERKTE.map((markt) => (
            <MarktKarte key={markt.name} markt={markt} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Vergangene Märkte */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-light tracking-wide mb-6">
          Vergangene Termine
        </h2>
        <div className="flex flex-col gap-4">
          {VERGANGENE_MAERKTE.map((markt) => (
            <MarktKarte key={markt.name} markt={markt} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* CTA */}
      <section className="text-center">
        <h2 className="font-serif text-2xl font-light tracking-wide mb-3">
          Nicht in der Nähe?
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Kein Problem — alle unsere Produkte sind auch online erhältlich.
        </p>
        <Button className="rounded-none" asChild>
          <Link href="/produkte">Online-Shop entdecken</Link>
        </Button>
      </section>
    </div>
  )
}
