import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MATERIAL_LABELS,
  MATERIAL_BESCHREIBUNGEN,
  VALID_MATERIALS,
} from "@/lib/filter-utils"
import type { Material } from "@/types/product"

export const metadata: Metadata = {
  title: "Materialguide",
  description:
    "Cashmere, Yak, Schafwolle, Kamelwolle — erfahre alles über die mongolischen Naturmaterialien und ihre besonderen Eigenschaften.",
}

const MATERIAL_DETAILS: Record<Material, {
  herkunft: string
  eigenschaften: string[]
  pflege: string
}> = {
  cashmere: {
    herkunft:
      "Gewonnen aus dem weichen Unterfell mongolischer Kaschmirziegen, die in den Hochebenen " +
      "der Mongolei auf über 2.000 Metern Höhe leben. Jedes Tier liefert nur 150–200 g pro Jahr.",
    eigenschaften: [
      "8× wärmer als Schafwolle bei gleichem Gewicht",
      "Extrem leicht und fein (14–19 Mikron)",
      "Natürlich temperaturregulierend",
      "Wird mit jeder Wäsche weicher",
    ],
    pflege:
      "Handwäsche in lauwarmem Wasser mit mildem Wollwaschmittel. " +
      "Liegend trocknen, nie auswringen. Zwischen den Tragezeiten gefaltet lagern.",
  },
  yak: {
    herkunft:
      "Stammt vom Bauch der Yaks, die auf über 3.000 Metern in den mongolischen Steppen leben. " +
      "Die Faser wird im Frühling beim natürlichen Fellwechsel ausgekämmt.",
    eigenschaften: [
      "Wärmer als Merinowolle",
      "Feiner als viele Schafwollarten (16–20 Mikron)",
      "Natürlich geruchsresistent",
      "Besonders robust und langlebig",
    ],
    pflege:
      "Handwäsche oder Wollprogramm bei max. 30 °C. " +
      "Liegend trocknen. Yakwolle ist pflegeleichter als Cashmere.",
  },
  schafwolle: {
    herkunft:
      "Traditionelle mongolische Schafwolle von Fettschwanzschafen, die seit Jahrtausenden " +
      "von Nomadenfamilien gehalten werden. Geschoren im Frühsommer.",
    eigenschaften: [
      "Robust und strapazierfähig",
      "Natürlich atmungsaktiv und feuchtigkeitsregulierend",
      "Temperaturausgleichend — wärmt im Winter, kühlt im Sommer",
      "Natürlicher UV-Schutz",
    ],
    pflege:
      "Wollprogramm bei max. 30 °C oder Handwäsche. " +
      "Regelmäßiges Auslüften reicht oft aus. Nicht im Trockner trocknen.",
  },
  kamelwolle: {
    herkunft:
      "Seltene Wolle vom baktrischen Kamel der Gobi-Wüste. Die Tiere werfen ihr weiches " +
      "Unterhaar im Frühling natürlich ab — es wird gesammelt, nicht geschoren.",
    eigenschaften: [
      "Natürlich thermoregulierend (Wüstenklima-Anpassung)",
      "Leichter als Schafwolle bei gleicher Wärme",
      "Charakteristisch warmer, goldener Farbton",
      "Hypoallergen und hautfreundlich",
    ],
    pflege:
      "Handwäsche in kaltem bis lauwarmem Wasser. " +
      "Sehr schonend behandeln, liegend trocknen. Nicht bürsten.",
  },
}

export default function MaterialguidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-4">
        Materialguide
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-light leading-tight tracking-wide mb-6">
        Unsere Materialien
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground mb-12">
        Jedes unserer Materialien hat seine eigene Geschichte und besondere Eigenschaften.
        Hier erfährst du, was sie ausmacht — und wie du lange Freude daran hast.
      </p>

      {/* Materials */}
      {VALID_MATERIALS.map((material, index) => {
        const label = MATERIAL_LABELS[material]
        const beschreibung = MATERIAL_BESCHREIBUNGEN[material]
        const details = MATERIAL_DETAILS[material]

        return (
          <div key={material}>
            {index > 0 && <Separator className="my-12" />}
            <section id={material}>
              <h2 className="font-serif text-2xl font-light tracking-wide mb-3">{label}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                {beschreibung}
              </p>

              {/* Herkunft */}
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                Herkunft
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                {details.herkunft}
              </p>

              {/* Eigenschaften */}
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                Eigenschaften
              </h3>
              <ul className="space-y-1.5 mb-6">
                {details.eigenschaften.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>

              {/* Pflege */}
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                Pflegehinweis
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                {details.pflege}
              </p>

              {/* Link to products */}
              <Button variant="outline" size="sm" className="rounded-none" asChild>
                <Link href={`/produkte?material=${material}`}>
                  {label}-Produkte ansehen
                </Link>
              </Button>
            </section>
          </div>
        )
      })}
    </div>
  )
}
