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
        path.resolve(__dirname, './src/alert/alert.ts'),
        path.resolve(__dirname, './src/button/button.ts'),
        path.resolve(__dirname, './src/card/card.ts'),
        path.resolve(__dirname, './src/checkbox/checkbox.ts'),
        path.resolve(__dirname, './src/chip/chip.ts'),
        path.resolve(__dirname, './src/ripple/ripple.ts'),
        path.resolve(__dirname, './src/text-field/text-field.ts'),
        path.resolve(__dirname, './src/index.ts')
      ],
      formats: ['es']
    },
    rollupOptions: {
      external: /lit/,
      output: {
        globals: {
          lit: 'lit',
          'lit/decorators.js': 'lit/decorators',
          'lit/directives/style-map.js': 'lit/directives/style-map',
          'lit/directives/class-map.js': 'lit/directives/class-map',
          'lit/directives/when.js': 'lit/directives/when'
        }
      }
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
