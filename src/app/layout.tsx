import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/hooks/use-cart";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dulaan — Mongolische Wollprodukte",
    template: "%s | Dulaan",
  },
  description:
    "Handverlesene Cashmere-, Yak- und Kamelwollprodukte aus der Mongolei. Direkt von unserer Familie zu dir — authentisch, fair und von höchster Qualität.",
  keywords: [
    "Cashmere",
    "Mongolei",
    "Yak-Wolle",
    "Kamelwolle",
    "Schal",
    "Slow Luxury",
    "Fair Trade",
    "mongolische Wolle",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Dulaan",
    title: "Dulaan — Wärme aus der Mongolei",
    description:
      "Handverlesene Wollprodukte aus der Mongolei. Direkt von unserer Familie zu dir.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
