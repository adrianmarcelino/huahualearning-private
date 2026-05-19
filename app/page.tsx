import { Hero } from "@/components/hero";
import { PhoneMockupSection } from "@/components/phone-mockup";
import { Differentiator } from "@/components/differentiator";
import { BonusStack } from "@/components/bonus-stack";
import { VideoMarquee } from "@/components/video-marquee";
import { LaoshiCards } from "@/components/laoshi-cards";
import { LeadForm } from "@/components/lead-form";
import { VariantInit } from "@/components/variant-init";

export default function Page() {
  return (
    <main className="relative overflow-x-clip">
      <VariantInit redirectIfB />
      <Hero variant="A" />
      <PhoneMockupSection />
      <Differentiator />
      <BonusStack />
      <VideoMarquee />
      <LaoshiCards />
      <LeadForm />
    </main>
  );
}
