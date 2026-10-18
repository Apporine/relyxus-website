import { PageMeta } from "@/components/marketing/PublicSite";
import { HomeStage } from "@/components/home/HomeStage";
import { Closing, Compare, Deadline, Prove } from "@/components/home/Resolved";
import { pageMeta } from "@/content/meta";

/**
 * The homepage: six pinned stages and Explore around the signal core, then
 * the page resolves to paper for the deadline, the comparison, the proof
 * offer and the call to action.
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
      <Deadline />
      <Compare />
      <Prove />
      <Closing />
    </>
  );
}
