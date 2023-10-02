import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "main.js",
  output: {
    dir: "dist",
    format: "es",

    manualChunks: {
      vendor: ["lodash"],
      utilities: ["util.js"],
    },
  },
  plugins: [commonjs(), resolve()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
};
