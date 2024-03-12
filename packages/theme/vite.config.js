import { defineConfig } from 'vite'
import path from 'path'

import litCss from 'vite-plugin-lit-css'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: [
        path.resolve(__dirname, './src/index.ts')
      ],
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        globals: {
          lit: 'lit',
          'lit/decorators.js': 'lit/decorators',
          'lit/directives/when.js': 'lit/directives/when',
          "@holejs/utils": "@holejs/utils"
        }
      }
    }
  },
  plugins: [
    // transform styles
    // litCss({
    //   exclude: [/assets\/.*/]
    // }),

    // Generate .d.ts files
    dts(),
  ]
})
