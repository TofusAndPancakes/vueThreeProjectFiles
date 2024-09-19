import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//https://stackoverflow.com/questions/77053103/how-to-resolve-404-error-in-a-deployed-react-vite-app

// https://vitejs.dev/config/
export default defineConfig({
  base: `/vueThreeProject/`,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
