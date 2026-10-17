import { Redirect, Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PublicLayout } from "@/components/marketing/PublicSite";
const Home = lazy(() => import("@/pages/Home"));
const ProductPage = lazy(() =>
  import("@/pages/CorePages").then(module => ({
    default: module.ProductPage,
  }))
);
const SecurityPage = lazy(() =>
  import("@/pages/CorePages").then(module => ({
    default: module.SecurityPage,
  }))
);
const CompanyPage = lazy(() =>
  import("@/pages/CorePages").then(module => ({
    default: module.CompanyPage,
  }))
);
const FinancialServicesPage = lazy(() =>
  import("@/pages/CorePages").then(module => ({
    default: module.FinancialServicesPage,
  }))
);
const LegalPage = lazy(() =>
  import("@/pages/MarketingPages").then(module => ({
    default: module.LegalPage,
  }))
);
const ContactPage = lazy(() =>
  import("@/pages/MarketingPages").then(module => ({
    default: module.ContactPage,
  }))
);
const ResourceArticle = lazy(() =>
  import("@/pages/Resources").then(module => ({
    default: module.ResourceArticle,
  }))
);
const ResourcesPage = lazy(() =>
  import("@/pages/Resources").then(module => ({
    default: module.ResourcesPage,
  }))
);
const DemoPage = lazy(() =>
  import("@/pages/Demo").then(module => ({ default: module.DemoPage }))
);
const NotFound = lazy(() => import("@/pages/NotFound"));

function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <div className="container route-loading" role="status">
            Loading page content…
          </div>
        }
      >
        {children}
      </Suspense>
    </PublicLayout>
  );
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
      <Route path="/accessibility">
        <WithLayout>
          <LegalPage page="accessibility" />
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
    </ErrorBoundary>
  );
}

export default App;
