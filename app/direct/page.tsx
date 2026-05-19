import { Hero } from "@/components/hero";
import { PhoneMockupSection } from "@/components/phone-mockup";
import { Differentiator } from "@/components/differentiator";
import { BonusStack } from "@/components/bonus-stack";
import { VideoMarquee } from "@/components/video-marquee";
import { LaoshiCards } from "@/components/laoshi-cards";
import { PricingReveal } from "@/components/pricing-reveal";
import { VariantInit } from "@/components/variant-init";
import { StickyCta } from "@/components/shared/sticky-cta";

export default function DirectPage() {
  return (
    <main className="relative overflow-x-clip">
      <VariantInit assign="B" />
      <Hero variant="B" />
      <PhoneMockupSection />
      <Differentiator />
      <BonusStack />
      <VideoMarquee />
      <LaoshiCards />
      <PricingReveal />
      <StickyCta />
    </main>
  );
}
