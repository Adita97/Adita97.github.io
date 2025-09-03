import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const hmrHost = process.env.VITE_HMR_HOST || undefined;

  return {
    plugins: [react()],
    base: mode === 'production' ? '/feather-carnival-invite-frontend/' : '/',
    server: {
      host: true, // listen on all addresses, required for LAN access
      port: 5173,
      strictPort: false,
      hmr: hmrHost
        ? {
            host: hmrHost,
            protocol: "ws",
          }
        : true,
    },
  };
});
