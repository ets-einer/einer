import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const config = ({ mode }) => {
  process.env = Object.assign(
    process.env,
    loadEnv(mode, path.normalize(process.cwd() + "/../../"), "")
  );

  return defineConfig({
    server: {
      host: process.env.ON_DOCKER ? true : false,
      //@ts-ignore
      port: process.env.VITE_MOCK_PORT,
      strictPort: true,
    },
    plugins: [react()],
  });
};

export default config;
