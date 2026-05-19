import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { Navbar } from "@/components/shared/navbar";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Cursor } from "@/components/shared/cursor";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { StateProvider } from "@/lib/state-context";
import { AmbientCanvas } from "@/components/ambient/AmbientCanvas";
import { CursorTrail } from "@/components/shared/cursor-trail";
import { MiniMascot } from "@/components/mascot/MiniMascot";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["300", "400", "500", "600", "700", "800", "900"] });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["italic", "normal"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: "Huahua Private — Les Privat Mandarin 1-on-1",
  description:
    "Belajar Mandarin privat dengan Laoshi profesional. Bonus stack senilai Rp 868.000+ termasuk gratis: HSK 1-6 pass, 3 bulan AI Laoshi Premium, 1000+ video vocab.",
  metadataBase: new URL("https://private.huahualearning.com"),
  openGraph: {
    title: "Huahua Private — Les Mandarin 1-on-1",
    description: "Mandarin tutoring privat + bonus stack senilai Rp 868.000+ gratis.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#FBF4EA",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">
        <StateProvider>
          <AmbientCanvas />
          <LoadingScreen />
          <Cursor />
          <CursorTrail />
          <ProgressBar />
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
          <MiniMascot />
          <FloatingWhatsApp />
        </StateProvider>
      </body>
    </html>
  );
}
