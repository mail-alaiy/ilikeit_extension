import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: "index.html", // Popup flow
        tab: "tab.html", // New tab flow
        background: "src/background.js", // Should be shown in dist
        content: "src/content.js", // Should be shown in dist
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
