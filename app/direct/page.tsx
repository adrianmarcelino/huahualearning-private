import { Hero } from "@/components/hero/Hero";
import { WhyPrivate } from "@/components/why-private/WhyPrivate";
import { CaraKerja } from "@/components/cara-kerja/CaraKerja";
import { Comparison } from "@/components/comparison/Comparison";
import { Testimonial } from "@/components/testimonial/Testimonial";
import { Pricing } from "@/components/pricing/Pricing";
import { Bonus } from "@/components/bonus/Bonus";
import { Laoshi } from "@/components/laoshi/Laoshi";
import { FAQ } from "@/components/faq/FAQ";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { LeadForm } from "@/components/form/Form";

export default function Direct() {
  return (
    <main className="relative overflow-x-clip">
      <Hero variant="B" />
      <WhyPrivate />
      <CaraKerja />
      <Comparison />
      <Pricing />
      <Bonus />
      <Laoshi />
      <Testimonial />
      <FAQ />
      <FinalCTA />
      <LeadForm
        variant="B"
        eyebrow="📝 DAFTAR"
        heading="Daftar Sekarang & Lanjut ke Pembayaran"
        subheading="Isi form 30 detik, langsung lanjut ke checkout."
      />
    </main>
  );
}
