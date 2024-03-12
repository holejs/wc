import { esbuildPlugin } from '@web/dev-server-esbuild'

export default {
  files: [
    'packages/**/*__tests__/*.test.ts'
  ],
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto'
    })
  ]
}
