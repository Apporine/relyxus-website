import { Analytics } from "@vercel/analytics/react";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import { ProductPage } from "@/pages/Product";
import { SolutionRoute } from "@/pages/Solutions";
import { PilotPage } from "@/pages/Pilot";
import { DoraPage } from "@/pages/Dora";
import { ChecklistPage } from "@/pages/Checklist";
import { SecurityPage } from "@/pages/Security";
import { AboutPage } from "@/pages/About";
import {
  IncidentFilePage,
  IncidentsPage,
  ResourceArticle,
  ResourcesPage,
} from "@/pages/Resources";
import { DemoPage } from "@/pages/Demo";
import { ContactPage } from "@/pages/Contact";
import { LegalPage } from "@/pages/Legal";
import NotFound from "@/pages/NotFound";

/** Old URLs kept working after pages were merged or renamed. */
const redirects: [string, string][] = [
  ["/company", "/about"],
  ["/replay", "/pilot"],
  ["/pricing", "/product#pricing"],
  ["/privacy-policy", "/privacy"],
  ["/product/investigation", "/product#war-room"],
  ["/product/governed-actions", "/product#approvals"],
  ["/product/reporting", "/dora"],
  ["/deployment", "/security"],
  ["/integrations", "/product#fit"],
  ["/integrations/:slug", "/product#fit"],
  ["/accessibility", "/"],
  ["/specimen", "/"],
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={ProductPage} />
      <Route path="/solutions/:slug">
        {params => <SolutionRoute slug={params.slug} />}
      </Route>
      <Route path="/pilot" component={PilotPage} />
      <Route path="/dora" component={DoraPage} />
      <Route path="/dora/checklist" component={ChecklistPage} />
      <Route path="/security" component={SecurityPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/resources/incidents" component={IncidentsPage} />
      <Route path="/resources/incidents/:slug">
        {params => <IncidentFilePage slug={params.slug} />}
      </Route>
      <Route path="/resources/:slug">
        {params => <ResourceArticle slug={params.slug} />}
      </Route>
      <Route path="/demo" component={DemoPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy">
        <LegalPage page="privacy" />
      </Route>
      <Route path="/terms">
        <LegalPage page="terms" />
      </Route>
      {redirects.map(([from, to]) => (
        <Route path={from} key={from}>
          <Redirect to={to} replace />
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
      <Analytics />
    </ErrorBoundary>
  );
}
