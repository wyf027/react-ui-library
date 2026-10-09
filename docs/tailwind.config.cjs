module.exports = {
  ...require('../packages/ui/tailwind.config.cjs'),
  content: [
    '../packages/ui/src/**/*.{ts,tsx}',
    './*.md',
    './components/*.md',
    './guide/*.md',
    './demos/*.tsx',
    './.dumi/theme/**/*.{ts,tsx}',
  ],
  corePlugins: { preflight: false },
}
