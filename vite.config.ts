// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Debug environment variables during build
const apiKeyValue = process.env.NEXT_PUBLIC_DS_Gemini_API_Key || process.env.VITE_DS_Gemini_API_Key || process.env.DS_Gemini_API_Key || "";
console.log("[Vite Build] API Key Status:", apiKeyValue ? `SET (length: ${apiKeyValue.length})` : "NOT SET - checking all env vars:", Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('DS_') || k.includes('API')));

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Inject environment variables from Vercel into the client bundle at build time
  define: {
    "import.meta.env.VITE_DS_Gemini_API_Key": JSON.stringify(apiKeyValue),
  },
});
