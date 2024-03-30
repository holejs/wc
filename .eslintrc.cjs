module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:storybook/recommended',
    'plugin:chai-friendly/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {},
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'storybook-static/',
    'storybook-static-gh-pages/'
  ]
}
