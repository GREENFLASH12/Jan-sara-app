import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/produkte/AddToCartButton"
import { BewertungenSection } from "@/components/produkte/BewertungenSection"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getProduktBySlug } from "@/lib/products"
import {
  MATERIAL_LABELS,
  KATEGORIE_LABELS,
  MATERIAL_BESCHREIBUNGEN,
} from "@/lib/filter-utils"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const produkt = await getProduktBySlug(slug)

  if (!produkt) {
    return { title: "Produkt nicht gefunden" }
  }

  return {
    title: produkt.name,
    description:
      produkt.kurzbeschreibung ??
      `${produkt.name} — ${MATERIAL_LABELS[produkt.material]} von Dulaan.`,
  }
}

export default async function ProduktDetailPage({ params }: Props) {
  const { slug } = await params
  const produkt = await getProduktBySlug(slug)

  if (!produkt) {
    notFound()
  }

  const materialLabel = MATERIAL_LABELS[produkt.material]
  const kategorieLabel = KATEGORIE_LABELS[produkt.kategorie]
  const materialBeschreibung = MATERIAL_BESCHREIBUNGEN[produkt.material]
  const formattedPreis = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(produkt.preis)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Start</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/produkte">Produkte</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{produkt.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product layout: Image + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left: Images (Scrollable) */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
            {produkt.hauptbild_url ? (
              <Image
                src={produkt.hauptbild_url}
                alt={produkt.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-2xl tracking-widest uppercase opacity-15 text-foreground">
                  Dulaan
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {produkt.neu && (
                <Badge className="rounded-none px-3 py-1 text-xs tracking-widest uppercase bg-foreground text-background">
                  Neu
                </Badge>
              )}
              {!produkt.auf_lager && (
                <Badge
                  variant="secondary"
                  className="rounded-none px-3 py-1 text-xs tracking-widest uppercase"
                >
                  Ausverkauft
                </Badge>
              )}
            </div>
          </div>
          
          {/* Mock additional images for layout demonstration */}
          {produkt.hauptbild_url && (
            <div className="grid grid-cols-2 gap-4">
               <div className="relative aspect-[3/4] overflow-hidden bg-secondary/50">
                <Image src={produkt.hauptbild_url} alt="Detail" fill className="object-cover opacity-80" />
               </div>
               <div className="relative aspect-[3/4] overflow-hidden bg-secondary/50">
                <Image src={produkt.hauptbild_url} alt="Detail" fill className="object-cover opacity-80" />
               </div>
            </div>
          )}
        </div>

        {/* Right: Product info (Sticky) */}
        <div className="flex flex-col sticky top-28 h-fit pb-12">
          {/* Category + Material */}
          <div className="flex items-center gap-3 text-[11px] tracking-widest uppercase text-muted-foreground">
            <span>{kategorieLabel}</span>
            <span className="text-border">|</span>
            <span>{materialLabel}</span>
          </div>

          {/* Name */}
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-light leading-tight tracking-wide">
            {produkt.name}
          </h1>

          {/* Price */}
          <p className="mt-4 text-2xl font-medium">{formattedPreis}</p>

          <p className="mt-1 text-xs text-muted-foreground">inkl. MwSt., zzgl. Versandkosten</p>

          {/* Description */}
          {produkt.kurzbeschreibung && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {produkt.kurzbeschreibung}
            </p>
          )}

          {/* Add to cart */}
          <div className="mt-8">
            <AddToCartButton produkt={produkt} />
          </div>

          <Separator className="my-8" />

          {/* Material section */}
          <div>
            <h2 className="font-serif text-lg font-light tracking-wide mb-3">
              Über {materialLabel}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {materialBeschreibung}
            </p>
            <Link
              href="/materialguide"
              className="mt-3 inline-block text-xs tracking-wider uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Zum Materialguide
            </Link>
          </div>

          <Separator className="my-8" />

          {/* Herkunft */}
          <div>
            <h2 className="font-serif text-lg font-light tracking-wide mb-3">
              Herkunft & Qualität
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                Handverlesen von unserer Familie in der Mongolei
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                Faire Zusammenarbeit mit lokalen Hirtenfamilien
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                Natürlich gewonnen, minimal verarbeitet
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                Qualitätskontrolle vor jedem Versand
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-16">
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" asChild>
          <Link href="/produkte">
            <ChevronLeft className="h-4 w-4" />
            Alle Produkte
          </Link>
        </Button>
      </div>

      {/* Bewertungen */}
      <BewertungenSection produktSlug={slug} />
    </div>
  )
}
