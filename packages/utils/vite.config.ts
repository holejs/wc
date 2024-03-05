import { defineConfig } from 'vite'
import path from 'path'

import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: [
        path.resolve(__dirname, './src/index.ts')
      ],
      formats: ['es']
    }
  },
  plugins: [
    // Generate .d.ts files
    dts(),
  ]
})
