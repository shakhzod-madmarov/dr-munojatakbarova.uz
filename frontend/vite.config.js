import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // Lets the sitemap generator resolve hashed asset filenames.
    manifest: !isSsrBuild,
    // The SSR bundle is a single module loaded by the prerender script; the
    // browser-oriented chunking below would only get in its way.
    ...(isSsrBuild
      ? {}
      : {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes("node_modules")) {
                  if (id.includes("react-router-dom") || id.includes("react-router")) return "router";
                  if (id.includes("react-toastify")) return "vendor-utils";
                  if (id.includes("react") || id.includes("react-dom")) return "react-vendor";
                }
              },
            },
          },
        }),
  },
}));
