import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.scss'),
      name: 'DesignToolkit',
      fileName: 'toolkit',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: 'css/[name].[ext]'
      }
    },
    cssCodeSplit: false
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
  }
})
