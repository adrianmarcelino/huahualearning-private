import { Hero } from "@/components/hero";
import { PhoneMockupSection } from "@/components/phone-mockup";
import { Differentiator } from "@/components/differentiator";
import { BonusStack } from "@/components/bonus-stack";
import { VideoMarquee } from "@/components/video-marquee";
import { LaoshiCards } from "@/components/laoshi-cards";
import { PricingReveal } from "@/components/pricing-reveal";
import { VariantInit } from "@/components/variant-init";
import { StickyCta } from "@/components/shared/sticky-cta";
import { SectionDivider } from "@/components/shared/section-divider";

export default function DirectPage() {
  return (
    <main className="relative overflow-x-clip">
      <VariantInit assign="B" />
      <Hero variant="B" />
      <SectionDivider variant="wave" from="#FBF4EA" to="#FBF4EA" />
      <PhoneMockupSection />
      <SectionDivider variant="blob" from="#FBF4EA" to="#F7F0E2" />
      <Differentiator />
      <SectionDivider variant="angle" from="#F7F0E2" to="#FBF4EA" flip />
      <BonusStack />
      <SectionDivider variant="wave" from="#FBF4EA" to="#F7F0E2" />
      <VideoMarquee />
      <SectionDivider variant="blob" from="#F7F0E2" to="#FBF4EA" flip />
      <LaoshiCards />
      <PricingReveal />
      <StickyCta />
    </main>
  );
}
