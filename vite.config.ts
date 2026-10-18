import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import { publicPlatformScript } from "./server/_core/publicConfig";

// Static development and static publishing use the same public-value whitelist
// as Express. Runtime-only secrets never enter the browser bundle. Express keeps
// serving this path dynamically when the application server is selected.
function vitePluginPublicPlatformConfig(): Plugin {
  return {
    name: "relyxus-public-platform-config",
    configureServer(server) {
      server.middlewares.use("/api/platform/config.js", (_req, res) => {
        res.setHeader("Content-Type", "application/javascript");
        res.setHeader("Cache-Control", "no-store");
        res.end(publicPlatformScript());
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "api/platform/config.js",
        source: publicPlatformScript(),
      });
    },
  };
}

function vitePluginContactApi(): Plugin {
  return {
    name: "relyxus-contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        const chunks: Buffer[] = [];
        req.on("data", chunk => chunks.push(Buffer.from(chunk)));
        req.on("end", async () => {
          try {
            const { deliverContactEmail, validateContactPayload } =
              await import("./shared/contact");
            const raw = Buffer.concat(chunks).toString("utf8");
            const body = raw ? JSON.parse(raw) : {};
            const validated = validateContactPayload(body);
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store");
            if (!validated.ok) {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, errors: validated.errors }));
              return;
            }
            const result = await deliverContactEmail(validated.data);
            if (!result.ok) {
              res.statusCode = 502;
              res.end(JSON.stringify({ ok: false, error: result.error }));
              return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, provider: result.provider }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                ok: false,
                error:
                  error instanceof Error
                    ? error.message
                    : "Unexpected delivery error",
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    vitePluginPublicPlatformConfig(),
    vitePluginContactApi(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  // NEXT_PUBLIC_ keeps the variable names the spec uses (e.g. the booking URL).
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
