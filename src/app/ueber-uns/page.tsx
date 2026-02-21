import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Unsere Geschichte",
  description:
    "Die Geschichte hinter Dulaan — eine mongolisch-deutsche Familie bringt handverlesene Wollprodukte aus der Mongolei nach Deutschland.",
}

export default function UeberUnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-4">
        Unsere Geschichte
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-light leading-tight tracking-wide mb-6">
        Wärme aus der Mongolei,
        <br />
        direkt von unserer Familie zu dir
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground mb-12">
        Dulaan bedeutet &bdquo;Wärme&ldquo; auf Mongolisch — und genau das wollen wir weitergeben.
        Nicht nur durch unsere Produkte, sondern durch die Art, wie wir arbeiten: ehrlich,
        persönlich und mit Respekt für Mensch und Natur.
      </p>

      <Separator className="my-12" />

      {/* Die Anfänge */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-light tracking-wide mb-4">Die Anfänge</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          Alles begann auf den Weihnachtsmärkten in Deutschland. Unsere Familie — halb
          mongolisch, halb deutsch — brachte die ersten Cashmere-Schals und Yak-Wolldecken
          mit nach Deutschland. Was als kleine Idee begann, wurde schnell zu einer Leidenschaft:
          Menschen die Qualität und Wärme mongolischer Wolle näherzubringen.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Auf den Märkten erlebten wir immer wieder dasselbe: Kunden, die zum ersten Mal
          echte mongolische Cashmere-Wolle anfassten, waren sofort begeistert. &bdquo;So etwas
          habe ich noch nie gefühlt&ldquo; — diesen Satz hören wir bis heute am häufigsten.
        </p>
      </section>

      {/* Woher unsere Wolle kommt */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-light tracking-wide mb-4">
          Woher unsere Wolle kommt
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          Unsere Produkte stammen direkt aus der Mongolei — einem Land, in dem Nomadenfamilien
          seit Jahrtausenden mit ihren Herden durch die Steppe ziehen. Die Wolle wird von
          Kaschmirziegen, Yaks, Schafen und baktrischen Kamelen gewonnen, die in den rauen
          Hochebenen der Mongolei leben.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Das extreme Klima — mit Temperaturen von minus 40 Grad im Winter — sorgt dafür,
          dass die Tiere ein besonders feines, dichtes Unterfell entwickeln. Genau dieses
          Unterfell ist die Grundlage für die außergewöhnliche Qualität unserer Produkte.
        </p>
      </section>

      {/* Faire Zusammenarbeit */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-light tracking-wide mb-4">
          Faire Zusammenarbeit
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          Wir arbeiten direkt mit Hirtenfamilien und kleinen Manufakturen in der Mongolei
          zusammen. Kein Zwischenhandel, keine anonyme Lieferkette. Wir kennen die Menschen,
          die unsere Wolle gewinnen und verarbeiten — persönlich.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Das bedeutet faire Preise für die Produzenten und transparente Herkunft für unsere
          Kunden. Jedes Produkt, das du bei uns kaufst, unterstützt direkt mongolische Familien
          und ihre traditionelle Lebensweise.
        </p>
      </section>

      {/* Warum Dulaan */}
      <section>
        <h2 className="font-serif text-2xl font-light tracking-wide mb-4">Warum Dulaan?</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          Es gibt viele Anbieter von Cashmere und Wollprodukten. Was uns unterscheidet, ist
          die persönliche Verbindung: Wir sind keine anonyme Marke. Wir sind eine Familie,
          die zwischen zwei Kulturen lebt und das Beste aus beiden Welten zusammenbringt.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Bei Dulaan kaufst du nicht einfach ein Produkt — du wirst Teil einer Geschichte.
          Einer Geschichte von Tradition, Qualität und echtem Handwerk. Und du bekommst
          ein Stück Mongolei nach Hause geliefert, das dich viele Jahre lang wärmen wird.
        </p>
      </section>
    </div>
  )
}
