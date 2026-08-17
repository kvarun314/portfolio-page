import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/utils";

// GitHub Pages is static hosting with no server, so custom HTTP response
// headers (CSP, HSTS, X-Frame-Options, etc.) can't be served — headers()
// is a no-op under output: "export". GitHub Pages does enforce HTTPS/HSTS
// on *.github.io itself. A best-effort CSP is set via <meta> in layout.tsx
// instead, since that's the only one of these with a meta-tag equivalent.
const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
