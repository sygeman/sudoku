import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";

export default defineConfig({
  test: {
    environment: "jsdom",
    transformMode: {
      web: [/.[jt]sx?/],
    },
    deps: {
      registerNodeLoader: true,
    },
    threads: false,
    isolate: false,
  },
  resolve: {
    conditions: ["development", "browser"],
  },
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [presetAttributify(), presetUno()],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
