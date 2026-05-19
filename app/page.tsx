import { Hero } from "@/components/hero/Hero";
import { CaraKerja } from "@/components/cara-kerja/CaraKerja";
import { Differentiator } from "@/components/differentiator/Diff";
import { Bonus } from "@/components/bonus/Bonus";
import { Video } from "@/components/video/Video";
import { Bento } from "@/components/bento/Bento";
import { Laoshi } from "@/components/laoshi/Laoshi";
import { LeadForm } from "@/components/form/Form";
import { VariantInit } from "@/components/VariantInit";

export default function Page() {
  return (
    <main className="relative overflow-x-clip">
      <VariantInit redirectIfB />
      <Hero variant="A" />
      <CaraKerja />
      <Differentiator />
      <Bonus />
      <Video />
      <Bento />
      <Laoshi />
      <LeadForm />
    </main>
  );
}
