import { PageMeta } from "@/components/layout/PageMeta";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ClockBand } from "@/components/sections/ClockBand";
import { Audiences } from "@/components/sections/Audiences";
import { Proof } from "@/components/sections/Proof";
import { Compare } from "@/components/sections/Compare";
import { Start } from "@/components/sections/Start";

export default function Home() {
  return (
    <>
      <PageMeta route="/" />
      <Hero />
      <TrustStrip />
      <Problem />
      <HowItWorks />
      <ClockBand />
      <Audiences />
      <Proof />
      <Compare />
      <Start />
    </>
  );
}
