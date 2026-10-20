import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/product.css";
import "./styles/sections.css";
import "./styles/commitments.css";
import "./styles/diagrams.css";

createRoot(document.getElementById("root")!).render(<App />);
