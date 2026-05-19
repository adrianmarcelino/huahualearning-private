import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["300", "400", "500", "600", "700", "800", "900"] });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["italic", "normal"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: "Huahua Private — Les Mandarin 1-on-1",
  description: "Mandarin privat dengan Laoshi profesional. Bonus stack Rp 868.000+ gratis.",
  metadataBase: new URL("https://private.huahualearning.com")
};

export const viewport: Viewport = {
  themeColor: "#FBF4EA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
