/// <reference types="vitest" />

import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: [
        path.resolve(__dirname, './src/button/button.ts'),
        path.resolve(__dirname, './src/card/card.ts'),
        path.resolve(__dirname, './src/chip/chip.ts'),
        path.resolve(__dirname, './src/ripple/ripple.ts'),
        path.resolve(__dirname, './src/index.ts')
      ],
      formats: ['es']
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  plugins: [
    // Generate d.ts.
    dts({ outDir: './dist/types' }),

    // Generate static files.
    viteStaticCopy({
      targets: [
        {
          src: './src/assets/**/*.css',
          dest: './assets'
        }
      ]
    })
  ]
})
