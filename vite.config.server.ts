import { defineConfig } from "vite";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// Server build configuration
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "backend/routes",
          dest: ".",
        },
        {
          src: "backend/controllers",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "backend/server.js"),
      name: "server",
      fileName: "production",
      formats: ["cjs"],
    },
    outDir: "dist/backend",
    target: "node22",
    ssr: true,
    rollupOptions: {
      output: {
        format: "cjs",
        entryFileNames: "[name].js",
      },
    },
    minify: false, // Keep readable for debugging
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});