import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/design/', // Important pour GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: 'css/[name].[ext]'
      }
    },
    cssCodeSplit: false,
    minify: 'terser',
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/variables";`
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  }
})
