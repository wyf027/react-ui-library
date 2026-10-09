module.exports = {
  ...require('../packages/ui/tailwind.config.cjs'),
  darkMode: ['class', '[data-prefers-color="dark"]'],
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
