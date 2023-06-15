import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      formats: ["cjs", "es"],
      entry: resolve(__dirname, "index.ts"),
      fileName: (format) => `index.${format}.js`,
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reportsDirectory: "./tests/unit/coverage",
    },
  },
});
