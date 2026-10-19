import { Component, type ReactNode } from "react";

type State = { hasError: boolean };

/** A plain fallback in the site's voice; the details go to the console. */
class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="section section-paper">
        <div className="container narrow">
          <h1>Something went wrong on our side</h1>
          <p className="lead">
            Reload the page to try again. If it keeps happening, email the team
            and we’ll look into it.
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload the page
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
