import { Hero } from "@/components/hero";
import { PhoneMockupSection } from "@/components/phone-mockup";
import { Differentiator } from "@/components/differentiator";
import { BonusStack } from "@/components/bonus-stack";
import { VideoMarquee } from "@/components/video-marquee";
import { LaoshiCards } from "@/components/laoshi-cards";
import { LeadForm } from "@/components/lead-form";
import { VariantInit } from "@/components/variant-init";
import { SectionDivider } from "@/components/shared/section-divider";

export default function Page() {
  return (
    <main className="relative overflow-x-clip">
      <VariantInit redirectIfB />
      <Hero variant="A" />
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
      <SectionDivider variant="angle" from="#FBF4EA" to="#FBF4EA" />
      <LeadForm />
    </main>
  );
}
