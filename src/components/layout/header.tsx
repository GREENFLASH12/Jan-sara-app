"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/produkte", label: "Produkte" },
  { href: "/materialguide", label: "Materialguide" },
  { href: "/ueber-uns", label: "Unsere Geschichte" },
  { href: "/maerkte", label: "Märkte" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-light tracking-widest uppercase text-foreground hover:text-accent transition-colors"
          >
            Dulaan
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Cart + Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" size="icon" aria-label="Warenkorb" className="relative hover:bg-foreground/5" asChild>
              <Link href="/warenkorb">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute 1 top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-medium">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-foreground/5"
                  aria-label="Menü öffnen"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12">
                <div className="flex flex-col gap-1">
                  <Link
                    href="/"
                    className="font-serif text-xl font-light tracking-widest uppercase mb-6 block"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dulaan
                  </Link>
                  <Separator className="mb-4" />
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-base tracking-wide text-foreground hover:text-accent transition-colors border-b border-border/40 last:border-0"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-6">
                    <Link
                      href="/warenkorb"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-3 text-base tracking-wide text-foreground hover:text-accent transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Warenkorb
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
