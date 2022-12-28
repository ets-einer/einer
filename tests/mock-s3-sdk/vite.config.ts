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
      //@ts-ignore
      port: process.env.VITE_TEST_S3_SDK_PORT || 5173,
      strictPort: true,
    },
    plugins: [react()],
  });
};

export default config;
