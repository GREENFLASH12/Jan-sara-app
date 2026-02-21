import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const shopLinks = [
  { href: "/produkte", label: "Alle Produkte" },
  { href: "/produkte?material=cashmere", label: "Cashmere" },
  { href: "/produkte?material=yak", label: "Yak-Wolle" },
  { href: "/produkte?material=kamel", label: "Kamelwolle" },
  { href: "/materialguide", label: "Materialguide" },
];

const brandLinks = [
  { href: "/ueber-uns", label: "Unsere Geschichte" },
  { href: "/maerkte", label: "Märkte & Termine" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/versand", label: "Versand & Rückgabe" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl font-light tracking-widest uppercase text-foreground"
            >
              Dulaan
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Wärme aus der Mongolei —<br />
              direkt von unserer Familie zu dir.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase text-foreground mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Links */}
          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase text-foreground mb-4">
              Über uns
            </h3>
            <ul className="space-y-3">
              {brandLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase text-foreground mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Dulaan. Alle Rechte vorbehalten.</p>
          <p>Handverlesene Wollprodukte aus der Mongolei</p>
        </div>
      </div>
    </footer>
  );
}
