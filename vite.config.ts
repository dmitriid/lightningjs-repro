import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import legacy from "@vitejs/plugin-legacy";
import hexColorTransform from "@lightningtv/vite-hex-transform";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    hexColorTransform({
      include: ["src/**/*.{ts,tsx,js,jsx}"],
    }),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
      },
    }),
    legacy({
      targets: ["defaults", "Chrome >= 49"],
      // additionalLegacyPolyfills: ["whatwg-fetch", "es6-proxy-polyfill"],
    }),
  ],
  resolve: {
    alias: {
      theme: "@lightningjs/l3-ui-theme-base",
    },
    dedupe: [
      "solid-js",
      "@lightningtv/solid",
      "@lightningtv/core",
      "@lightningjs/renderer",
    ],
  },
  optimizeDeps: {
    include: [],
    exclude: [
      '@lightningjs/solid',
      '@lightningjs/solid-primitives',
      '@lightningjs/solid-ui',
      '@lightningjs/renderer/core',
      '@lightningjs/renderer/workers/renderer']
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
