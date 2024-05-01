import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';
import { fileURLToPath } from 'url';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

// import pkg from "./package.json" assert { type: "json" };

// const externalDeps = Object.keys(pkg.dependencies || {});

const resolve = (filePath: string) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, filePath);
};

const input = 'index.ts';
const output = 'index.js';
const dtsOutput = 'index.d.ts';
const outDir = 'dist';

const packagePath = './packages';
const corePath = `${packagePath}/core`;
const corePathInput = `${corePath}/${input}`;
const requestPath = `${packagePath}/request`;
const requestPathInput = `${requestPath}/${input}`;

const esmRollupConfig = [
  {
    input: resolve(corePathInput),
    output: resolve(`${corePath}/${outDir}/${output}`),
  },
  {
    input: resolve(requestPathInput),
    output: resolve(`${requestPath}/${outDir}/${output}`),
  },
];

const dtsRollupConfig = [
  {
    input: resolve(corePathInput),
    output: resolve(`${corePath}/${outDir}/${dtsOutput}`),
  },
  {
    input: resolve(requestPathInput),
    output: resolve(`${requestPath}/${outDir}/${dtsOutput}`),
  },
];

const getPlugins = () => {
  return [
    typescript({
      tsconfig: resolve('./tsconfig.json'),
    }),
  ];
};

const esmConfigs = esmRollupConfig.map((config) =>
  defineConfig({
    input: config.input,
    // external: externalDeps,
    output: [
      {
        file: config.output,
        format: 'esm',
      },
    ],
    plugins: getPlugins().concat([
      terser({
        output: {
          ascii_only: true,
        },
      }),
    ]),
  }),
);

const dtsConfigs = dtsRollupConfig.map((config) =>
  defineConfig({
    input: config.input,
    output: {
      file: config.output,
      format: 'esm',
    },
    plugins: getPlugins().concat([dts()]),
  }),
);

export default [...esmConfigs, ...dtsConfigs];
