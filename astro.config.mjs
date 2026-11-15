import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://relyxus.com",
  trailingSlash: "never",
  build: { format: "file" },
  devToolbar: { enabled: false },
});
