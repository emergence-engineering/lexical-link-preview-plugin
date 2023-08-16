import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-import-css";
import babel from "rollup-plugin-babel";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    { file: pkg.module, format: "es", sourceMap: true },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    excludeDependenciesFromBundle(),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Include JSX file extension
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    copy({
      targets: [{ src: "src/styles/*", dest: "dist/styles" }],
    }),
    css(),
    typescript(),
  ],
};
