import {
  EarlyAccessProof,
  PageMeta,
  PilotResult,
} from "@/components/marketing/PublicSite";
import { HomeStage } from "@/components/home/HomeStage";
import { Closing, Compare, Deadline, Prove } from "@/components/home/Resolved";
import {
  BeforeAfterStrip,
  FeatureMap,
} from "@/components/marketing/ProductClarity";
import { pageMeta } from "@/content/meta";

/**
 * The homepage: six pinned stages and Explore around the signal core, then
 * the page resolves to paper — features, early-access proof, deadline,
 * comparison, proof offer and CTA.
 */
export default function Home() {
  return (
    <>
      <PageMeta
        title={pageMeta["/"].title}
        description={pageMeta["/"].description}
        keywords="Relyxus, incident investigation, payments incidents, operational resilience, SRE, regulated firms"
      />
      <HomeStage />
      <FeatureMap ground="paper" />
      <BeforeAfterStrip />
      <EarlyAccessProof ground="ink" />
      <PilotResult ground="paper" />
      <Deadline />
      <Compare />
      <Prove />
      <Closing />
    </>
  );
}
