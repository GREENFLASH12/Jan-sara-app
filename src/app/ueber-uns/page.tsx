import type { Metadata } from "next"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Unsere Geschichte",
  description:
    "Die Geschichte hinter Dulaan — eine mongolisch-deutsche Familie bringt handverlesene Wollprodukte aus der Mongolei nach Deutschland.",
}

export default function UeberUnsPage() {
  return (
    <div className="pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-end justify-center pb-16 bg-secondary/30">
        <Image
          src="https://images.unsplash.com/photo-1542640244-7e672d6cb461?q=80&w=2000&auto=format&fit=crop"
          alt="Nomadic tent in Mongolia"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 text-center max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Unsere Geschichte
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-wide mb-6">
            Wärme aus der Mongolei,<br className="hidden sm:block" />
            direkt von unserer Familie zu dir
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center mb-24 sm:mb-32">
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground font-light">
            Dulaan bedeutet <span className="text-foreground italic font-serif">&bdquo;Wärme&ldquo;</span> auf Mongolisch — und genau das wollen wir weitergeben.
            Nicht nur durch unsere Produkte, sondern durch die Art, wie wir arbeiten: ehrlich,
            persönlich und mit Respekt für Mensch und Natur.
          </p>
        </div>

        {/* Die Anfänge (Image Left) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 sm:mb-32">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20 order-2 md:order-1">
            <Image 
              src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000&auto=format&fit=crop" 
              alt="Cashmere Schals auf einem Markt"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2 max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide mb-6">Die Anfänge</h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
              Alles begann auf den Weihnachtsmärkten in Deutschland. Unsere Familie — halb
              mongolisch, halb deutsch — brachte die ersten Cashmere-Schals und Yak-Wolldecken
              mit nach Deutschland. Was als kleine Idee begann, wurde schnell zu einer Leidenschaft:
              Menschen die Qualität und Wärme mongolischer Wolle näherzubringen.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Auf den Märkten erlebten wir immer wieder dasselbe: Kunden, die zum ersten Mal
              echte mongolische Cashmere-Wolle anfassten, waren sofort begeistert.
            </p>
            <blockquote className="mt-8 border-l-2 border-accent/40 pl-6 py-2">
              <p className="font-serif text-xl sm:text-2xl italic font-light text-foreground">
                &bdquo;So etwas habe ich noch nie gefühlt&ldquo;
              </p>
              <footer className="text-xs tracking-widest uppercase text-muted-foreground mt-3">— Unsere Kunden</footer>
            </blockquote>
          </div>
        </section>

        {/* Woher unsere Wolle kommt (Image Right) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 sm:mb-32">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide mb-6">
              Woher unsere Wolle kommt
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
              Unsere Produkte stammen direkt aus der Mongolei — einem Land, in dem Nomadenfamilien
              seit Jahrtausenden mit ihren Herden durch die Steppe ziehen. Die Wolle wird von
              Kaschmirziegen, Yaks, Schafen und baktrischen Kamelen gewonnen, die in den rauen
              Hochebenen der Mongolei leben.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Das extreme Klima — mit Temperaturen von minus 40 Grad im Winter — sorgt dafür,
              dass die Tiere ein besonders feines, dichtes Unterfell entwickeln. Genau dieses
              Unterfell ist die Grundlage für die außergewöhnliche Qualität unserer Produkte.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
            <Image 
              src="https://images.unsplash.com/photo-1601618365171-d820ff740660?q=80&w=1000&auto=format&fit=crop" 
              alt="Yaks in the Mongolian Steppe"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Full Width Quote */}
        <section className="mx-auto max-w-4xl text-center mb-24 sm:mb-32 py-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-snug tracking-wide text-foreground">
            &bdquo;Kein Zwischenhandel, keine anonyme Lieferkette. Wir kennen die Menschen,
            die unsere Wolle gewinnen und verarbeiten — persönlich.&ldquo;
          </h2>
        </section>

        {/* Faire Zusammenarbeit & Warum Dulaan (Two columns) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <div>
            <h3 className="font-serif text-2xl font-light tracking-wide mb-4">
              Faire Zusammenarbeit
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Wir arbeiten direkt mit Hirtenfamilien und kleinen Manufakturen in der Mongolei
              zusammen. Das bedeutet faire Preise für die Produzenten und transparente Herkunft für unsere
              Kunden.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Jedes Produkt, das du bei uns kaufst, unterstützt direkt mongolische Familien
              und ihre traditionelle Lebensweise.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-light tracking-wide mb-4">Warum Dulaan?</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Es gibt viele Anbieter von Cashmere und Wollprodukten. Was uns unterscheidet, ist
              die persönliche Verbindung: Wir sind keine anonyme Marke. Wir sind eine Familie,
              die zwischen zwei Kulturen lebt und das Beste aus beiden Welten zusammenbringt.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bei Dulaan kaufst du nicht einfach ein Produkt — du wirst Teil einer Geschichte.
              Einer Geschichte von Tradition, Qualität und echtem Handwerk.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
