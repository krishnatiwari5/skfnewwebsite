import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const cwd = process.cwd();

export default defineConfig(async () => {
  // base plugins
  const plugins: any[] = [react(), runtimeErrorOverlay()];

  // only load replit dev-only plugins when running inside Replit and not production
  if (process.env.NODE_ENV !== "production" && typeof process.env.REPL_ID !== "undefined") {
    try {
      const carto = await import("@replit/vite-plugin-cartographer");
      const devBanner = await import("@replit/vite-plugin-dev-banner");
      if (carto?.cartographer) plugins.push(carto.cartographer());
      if (devBanner?.devBanner) plugins.push(devBanner.devBanner());
    } catch (err) {
      // fail gracefully if plugins are not installed in some environments
      // (e.g. CI or local dev where the optional deps are not present)
      // keep the core plugins working.
      // eslint-disable-next-line no-console
      console.warn(
        "[vite] optional replit plugins not loaded:",
        err instanceof Error ? err.message : String(err)
      );
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        // use process.cwd() so paths are resolved relative to repo root consistently
        "@": path.resolve(cwd, "client", "src"),
        "@shared": path.resolve(cwd, "shared"),
        "@assets": path.resolve(cwd, "attached_assets"),
      },
    },
    // serve client folder as Vite root
    root: path.resolve(cwd, "client"),
    build: {
      // place built client into dist/public (matches your current structure)
      outDir: path.resolve(cwd, "dist", "public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
