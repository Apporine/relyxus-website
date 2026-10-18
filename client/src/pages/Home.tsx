import { PageMeta } from "@/components/marketing/PublicSite";
import { HomeStage } from "@/components/home/HomeStage";
import { Closing, Compare, Deadline, Prove } from "@/components/home/Resolved";
import {
  BeforeAfterStrip,
  FeatureMap,
} from "@/components/marketing/ProductClarity";
import { pageMeta } from "@/content/meta";

/**
 * The homepage: six pinned stages and Explore around the signal core, then
 * the page resolves to paper — feature inventory, before/after, deadline,
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
      <Deadline />
      <Compare />
      <Prove />
      <Closing />
    </>
  );
}
