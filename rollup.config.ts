import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import path from "node:path";
import { fileURLToPath } from "url";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json" assert { type: "json" };

const input = "./src/index.ts";
const outDir = "dist";

const externalDeps = Object.keys(pkg.dependencies || {});

function resolve(filePath: string) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, filePath);
}

const getPlugins = () => {
  return [
    typescript({
      tsconfig: resolve("./tsconfig.json"),
    }),
  ];
};

const esmConfig = defineConfig({
  input: input,
  external: externalDeps,
  output: [
    {
      file: resolve(`${outDir}/index.js`),
      format: "esm",
    },
  ],
  plugins: getPlugins().concat([
    terser({
      output: {
        ascii_only: true,
      },
    }),
  ]),
});

const dtsConfig = defineConfig({
  input: input,
  output: {
    file: resolve(`${outDir}/index.d.js`),
    format: "esm",
  },
  plugins: getPlugins().concat([dts()]),
});

export default [esmConfig, dtsConfig];
