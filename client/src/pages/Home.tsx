import { PageMeta } from "@/components/layout/PageMeta";
import { Hero } from "@/components/sections/Hero";
import { ModulesBand } from "@/components/sections/ModulesBand";
import { Walkthrough } from "@/components/sections/Walkthrough";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { Statement, Benefits } from "@/components/sections/Benefits";
import { ReportBanner } from "@/components/sections/ReportBanner";
import { IncidentCarousel } from "@/components/sections/IncidentCarousel";
import { HomeDemo } from "@/components/sections/HomeDemo";
import { Insights } from "@/components/sections/Insights";

/** Homepage: EcoOnline structure, Plum and Lime. Composes sections only. */
export default function Home() {
  return (
    <>
      <PageMeta route="/" />
      <Hero />
      <ModulesBand />
      <Walkthrough />
      <FeatureRows />
      <Statement />
      <Benefits />
      <ReportBanner />
      <IncidentCarousel />
      <HomeDemo />
      <Insights />
    </>
  );
}
