import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PublicLayout } from "@/components/marketing/PublicSite";
const Home = lazy(() => import("@/pages/Home"));
const ProductPage = lazy(() => import("@/pages/MarketingPages").then((module) => ({ default: module.ProductPage })));
const CompanyPage = lazy(() => import("@/pages/MarketingPages").then((module) => ({ default: module.CompanyPage })));
const LegalPage = lazy(() => import("@/pages/MarketingPages").then((module) => ({ default: module.LegalPage })));
const FinancialServicesPage = lazy(() => import("@/pages/MarketingPages").then((module) => ({ default: module.FinancialServicesPage })));
const ContactPage = lazy(() => import("@/pages/MarketingPages").then((module) => ({ default: module.ContactPage })));
const IntegrationDetail = lazy(() => import("@/pages/Integrations").then((module) => ({ default: module.IntegrationDetail })));
const IntegrationsPage = lazy(() => import("@/pages/Integrations").then((module) => ({ default: module.IntegrationsPage })));
const ResourceArticle = lazy(() => import("@/pages/Resources").then((module) => ({ default: module.ResourceArticle })));
const ResourcesPage = lazy(() => import("@/pages/Resources").then((module) => ({ default: module.ResourcesPage })));
const DemoPage = lazy(() => import("@/pages/Demo").then((module) => ({ default: module.DemoPage })));
const DeploymentPage = lazy(() => import("@/pages/Deployment").then((module) => ({ default: module.DeploymentPage })));
const ReplayPage = lazy(() => import("@/pages/EvaluationPages").then((module) => ({ default: module.ReplayPage })));
const PricingPage = lazy(() => import("@/pages/EvaluationPages").then((module) => ({ default: module.PricingPage })));
const NotFound = lazy(() => import("@/pages/NotFound"));

function WithLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout><Suspense fallback={<div className="container route-loading" role="status">Loading page content…</div>}>{children}</Suspense></PublicLayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/"><WithLayout><Home /></WithLayout></Route>
      <Route path="/product"><WithLayout><ProductPage page="overview" /></WithLayout></Route>
      <Route path="/product/investigation"><WithLayout><ProductPage page="investigation" /></WithLayout></Route>
      <Route path="/product/governed-actions"><WithLayout><ProductPage page="governed-actions" /></WithLayout></Route>
      <Route path="/product/reporting"><WithLayout><ProductPage page="reporting" /></WithLayout></Route>
      <Route path="/deployment"><WithLayout><DeploymentPage /></WithLayout></Route>
      <Route path="/security"><WithLayout><ProductPage page="security" /></WithLayout></Route>
      <Route path="/integrations"><WithLayout><IntegrationsPage /></WithLayout></Route>
      <Route path="/integrations/:slug">{(params) => <WithLayout><IntegrationDetail slug={params.slug} /></WithLayout>}</Route>
      <Route path="/solutions/financial-services"><WithLayout><FinancialServicesPage /></WithLayout></Route>
      <Route path="/replay"><WithLayout><ReplayPage /></WithLayout></Route>
      <Route path="/pricing"><WithLayout><PricingPage /></WithLayout></Route>
      <Route path="/demo"><WithLayout><DemoPage /></WithLayout></Route>
      <Route path="/resources"><WithLayout><ResourcesPage /></WithLayout></Route>
      <Route path="/resources/:slug">{(params) => <WithLayout><ResourceArticle slug={params.slug} /></WithLayout>}</Route>
      <Route path="/company"><WithLayout><CompanyPage /></WithLayout></Route>
      <Route path="/contact"><WithLayout><ContactPage /></WithLayout></Route>
      <Route path="/privacy"><WithLayout><LegalPage page="privacy" /></WithLayout></Route>
      <Route path="/terms"><WithLayout><LegalPage page="terms" /></WithLayout></Route>
      <Route path="/accessibility"><WithLayout><LegalPage page="accessibility" /></WithLayout></Route>
      <Route><WithLayout><NotFound /></WithLayout></Route>
    </Switch>
  );
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><Router /></ThemeProvider></ErrorBoundary>;
}

export default App;
