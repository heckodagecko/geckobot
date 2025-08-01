import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  minify: false,
  sourcemap: false,
  splitting: false,
  target: "esnext",
});
