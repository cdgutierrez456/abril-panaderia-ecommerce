import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

// Las dos tipografías del manual de marca, autoalojadas por next/font: sin
// petición a Google y sin salto de layout al cargar.
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abril Pastelería — Tortas hechas a tu medida",
  description:
    "Pastelería artesanal en Manizales. Tortas personalizadas, café y panadería del día.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jost.variable} ${cormorant.variable}`}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
