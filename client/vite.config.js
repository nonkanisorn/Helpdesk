//
// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//     define: {
//       'process.env': env
//     },
//     plugins: [react()],
//   }
// });
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@emotion/styled": path.resolve(
          __dirname,
          "node_modules/@emotion/styled/dist/emotion-styled.esm.js",
        ),
      },
    },
    optimizeDeps: {
      include: ["@emotion/styled", "@emotion/react"], // ✅ บอก Vite ว่า “ต้องโหลดแน่นอน”
    },
    plugins: [react()],
  };
});
