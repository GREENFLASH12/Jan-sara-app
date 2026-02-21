import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe2, CheckCircle2, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  MATERIAL_LABELS,
  MATERIAL_BESCHREIBUNGEN,
  VALID_MATERIALS,
} from "@/lib/filter-utils"

const MATERIAL_IMAGES: Record<string, string> = {
  cashmere: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
  yak: "https://images.unsplash.com/photo-1601618365171-d820ff740660?q=80&w=800&auto=format&fit=crop",
  schafwolle: "https://images.unsplash.com/photo-1598254248564-969c3a35ab9d?q=80&w=800&auto=format&fit=crop",
  kamelwolle: "https://images.unsplash.com/photo-1512411516086-444cbcf3b9ce?q=80&w=800&auto=format&fit=crop",
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row">
        {/* Left Side: Text */}
        <div className="flex-1 flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-32 xl:px-24 bg-background">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Mongolische Wollprodukte
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-wide mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
              Wärme aus der Mongolei
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              Handverlesene Cashmere-, Yak- und Kamelwollprodukte — direkt von unserer Familie zu dir.
              Authentisch, fair und von höchster Qualität.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
              <Button size="lg" className="rounded-none px-10 tracking-wider uppercase text-sm hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md" asChild>
                <Link href="/produkte">Produkte entdecken</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-none px-10 tracking-wider uppercase text-sm hover:-translate-y-1 transition-transform duration-300"
                asChild
              >
                <Link href="/ueber-uns">Unsere Geschichte</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Right Side: Image */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1544983220-410a823b10b0?q=80&w=1600&auto=format&fit=crop"
            alt="Mongolische Steppe und Yaks"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* USP Bar */}
      <section className="border-y border-border/60 bg-secondary/30 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <Globe2 className="h-6 w-6 mb-4 text-accent/80" strokeWidth={1.5} />
              <p className="text-sm font-medium tracking-wide uppercase">Direkt aus der Mongolei</p>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                Keine Zwischenhändler, faire Preise
              </p>
            </div>
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <CheckCircle2 className="h-6 w-6 mb-4 text-accent/80" strokeWidth={1.5} />
              <p className="text-sm font-medium tracking-wide uppercase">Handverlesen & geprüft</p>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                Jedes Produkt von uns persönlich ausgewählt
              </p>
            </div>
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <Truck className="h-6 w-6 mb-4 text-accent/80" strokeWidth={1.5} />
              <p className="text-sm font-medium tracking-wide uppercase">Versand in Deutschland</p>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                Sorgfältig verpackt und schnell geliefert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-4">
            Unsere Materialien
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
            Von der Steppe zu dir
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VALID_MATERIALS.map((material) => (
            <Link
              key={material}
              href={`/produkte?material=${material}`}
              className="group relative flex flex-col aspect-[4/5] overflow-hidden bg-secondary/20"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={MATERIAL_IMAGES[material]}
                  alt={MATERIAL_LABELS[material]}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              
              {/* Content */}
              <div className="relative z-20 mt-auto p-6 sm:p-8 flex flex-col text-white">
                <h3 className="font-serif text-2xl font-light tracking-wide mb-3">
                  {MATERIAL_LABELS[material]}
                </h3>
                <p className="text-xs leading-relaxed text-white/80 line-clamp-3 mb-6 transition-all duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  {MATERIAL_BESCHREIBUNGEN[material]}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/90 group-hover:text-white transition-colors">
                  Entdecken
                  <ArrowRight className="h-3 w-3 transform transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Story Teaser - Color Block */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="text-[11px] tracking-widest uppercase text-muted mb-6">
            Unsere Geschichte
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-8">
            Eine Familie, zwei Kulturen,<br className="hidden sm:block"/> eine Leidenschaft
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-background/80 mb-12 max-w-2xl mx-auto">
            Dulaan bedeutet &bdquo;Wärme&ldquo; auf Mongolisch. Wir sind eine mongolisch-deutsche
            Familie, die seit Jahren handverlesene Wollprodukte auf deutschen Märkten verkauft.
            Jetzt auch online — mit derselben Leidenschaft und Sorgfalt.
          </p>
          <Button variant="outline" className="rounded-none bg-transparent text-background border-background/40 hover:bg-background hover:text-foreground transition-all duration-300 px-10 uppercase tracking-wider text-xs" asChild>
            <Link href="/ueber-uns">
              Mehr erfahren
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
