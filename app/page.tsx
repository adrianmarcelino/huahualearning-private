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
import { VariantInit } from "@/components/VariantInit";

export default function Page() {
  return (
    <main className="relative overflow-x-clip">
      <VariantInit redirectIfB />
      <Hero variant="A" />
      <WhyPrivate />
      <CaraKerja />
      <Comparison />
      <Pricing />
      <Bonus />
      <Laoshi />
      <Testimonial />
      <FAQ />
      <FinalCTA />
      <LeadForm />
    </main>
  );
}
