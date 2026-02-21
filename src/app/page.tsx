import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MATERIAL_LABELS,
  MATERIAL_BESCHREIBUNGEN,
  VALID_MATERIALS,
} from "@/lib/filter-utils"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-28 sm:py-36 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Mongolische Wollprodukte
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-wide max-w-3xl">
          Wärme aus der Mongolei
        </h1>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
          Handverlesene Cashmere-, Yak- und Kamelwollprodukte — direkt von unserer Familie zu dir.
          Authentisch, fair und von höchster Qualität.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="rounded-none px-10 tracking-wider uppercase text-sm" asChild>
            <Link href="/produkte">Produkte entdecken</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-none px-10 tracking-wider uppercase text-sm"
            asChild
          >
            <Link href="/ueber-uns">Unsere Geschichte</Link>
          </Button>
        </div>
      </section>

      {/* USP Bar */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm font-medium">Direkt aus der Mongolei</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Keine Zwischenhändler, faire Preise
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Handverlesen & geprüft</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Jedes Produkt von uns persönlich ausgewählt
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Versand innerhalb Deutschlands</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sorgfältig verpackt, schnell geliefert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-3">
            Unsere Materialien
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide">
            Von der Steppe zu dir
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALID_MATERIALS.map((material) => (
            <Link
              key={material}
              href={`/produkte?material=${material}`}
              className="group p-6 border border-border/60 hover:border-accent/40 transition-colors"
            >
              <h3 className="font-serif text-lg font-light tracking-wide mb-2 group-hover:text-accent transition-colors">
                {MATERIAL_LABELS[material]}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {MATERIAL_BESCHREIBUNGEN[material]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                Entdecken
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Story Teaser */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-3">
          Unsere Geschichte
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide mb-6">
          Eine Familie, zwei Kulturen, eine Leidenschaft
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-8">
          Dulaan bedeutet &bdquo;Wärme&ldquo; auf Mongolisch. Wir sind eine mongolisch-deutsche
          Familie, die seit Jahren handverlesene Wollprodukte auf deutschen Märkten verkauft.
          Jetzt auch online — mit derselben Leidenschaft und Sorgfalt.
        </p>
        <Button variant="outline" className="rounded-none" asChild>
          <Link href="/ueber-uns">
            Mehr erfahren
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </>
  )
}
