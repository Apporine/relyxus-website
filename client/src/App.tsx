import { Analytics } from "@vercel/analytics/react";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PublicLayout } from "@/components/marketing/PublicSite";
import Home from "@/pages/Home";
import { CompanyPage, ProductPage, SecurityPage } from "@/pages/CorePages";
import { ContactPage, LegalPage } from "@/pages/MarketingPages";
import { ResourceArticle, ResourcesPage } from "@/pages/Resources";
import { DemoPage } from "@/pages/Demo";
import { FinancialServicesPage, SolutionPage } from "@/pages/Solutions";
import NotFound from "@/pages/NotFound";
// Pages are imported directly, not lazily: the site is small, and a lazy
// route showed a loading message before any copy on first load.
function WithLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

/** Pages folded into /product, /security or the demo form. */
const retired: [string, string][] = [
  ["/product/investigation", "/product"],
  ["/product/governed-actions", "/product"],
  ["/product/reporting", "/product"],
  ["/deployment", "/security"],
  ["/integrations", "/security"],
  ["/integrations/:slug", "/security"],
  ["/replay", "/demo?type=Replay%20pilot"],
  ["/pricing", "/demo?type=Pricing"],
  ["/accessibility", "/"],
];

function Router() {
  return (
    <Switch>
      <Route path="/">
        <WithLayout>
          <Home />
        </WithLayout>
      </Route>
      <Route path="/product">
        <WithLayout>
          <ProductPage />
        </WithLayout>
      </Route>
      <Route path="/security">
        <WithLayout>
          <SecurityPage />
        </WithLayout>
      </Route>
      <Route path="/solutions/financial-services">
        <WithLayout>
          <FinancialServicesPage />
        </WithLayout>
      </Route>
      <Route path="/solutions/:slug">
        {params => (
          <WithLayout>
            <SolutionPage slug={params.slug} />
          </WithLayout>
        )}
      </Route>
      {retired.map(([from, to]) => (
        <Route path={from} key={from}>
          <Redirect to={to} replace />
        </Route>
      ))}
      <Route path="/demo">
        <WithLayout>
          <DemoPage />
        </WithLayout>
      </Route>
      <Route path="/resources">
        <WithLayout>
          <ResourcesPage />
        </WithLayout>
      </Route>
      <Route path="/resources/:slug">
        {params => (
          <WithLayout>
            <ResourceArticle slug={params.slug} />
          </WithLayout>
        )}
      </Route>
      <Route path="/company">
        <WithLayout>
          <CompanyPage />
        </WithLayout>
      </Route>
      <Route path="/contact">
        <WithLayout>
          <ContactPage />
        </WithLayout>
      </Route>
      <Route path="/privacy">
        <WithLayout>
          <LegalPage page="privacy" />
        </WithLayout>
      </Route>
      <Route path="/privacy-policy">
        <WithLayout>
          <LegalPage page="privacy" />
        </WithLayout>
      </Route>
      <Route path="/terms">
        <WithLayout>
          <LegalPage page="terms" />
        </WithLayout>
      </Route>
      <Route>
        <WithLayout>
          <NotFound />
        </WithLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router />
      </ThemeProvider>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
