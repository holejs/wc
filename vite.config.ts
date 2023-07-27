/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: [
        path.resolve(__dirname, './src/index.ts'),
        path.resolve(__dirname, './src/button/button.ts'),
        path.resolve(__dirname, './src/ripple/ripple.ts')
      ],
      formats: ['es']
    },
    rollupOptions: {}
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  plugins: [
    dts({ outDir: './dist/types' })
  ]
})
