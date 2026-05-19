import { Hero } from "@/components/hero/Hero";
import { CaraKerja } from "@/components/cara-kerja/CaraKerja";
import { Differentiator } from "@/components/differentiator/Diff";
import { Bonus } from "@/components/bonus/Bonus";
import { Video } from "@/components/video/Video";
import { Bento } from "@/components/bento/Bento";
import { Laoshi } from "@/components/laoshi/Laoshi";
import { Checkout } from "@/components/checkout/Checkout";
import { VariantInit } from "@/components/VariantInit";

export default function Direct() {
  return (
    <main className="relative overflow-x-clip pb-16">
      <VariantInit force="B" />
      <Hero variant="B" />
      <CaraKerja />
      <Differentiator />
      <Bonus />
      <Video />
      <Bento />
      <Laoshi />
      <Checkout />
    </main>
  );
}
