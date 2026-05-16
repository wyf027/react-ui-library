/**
 * 为 Umi/dumi 构建链提供 `content` 来源，避免主题侧 Tailwind 报「content 为空」类警告。
 * 组件库样式仍以 `@wuyangfan/nova-ui/styles.css` 为准；此处不引入业务型插件。
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./docs/**/*.{md,tsx,ts,jsx,js}', './.dumi/**/*.{tsx,ts,jsx,js}', './.dumirc.ts'],
  theme: { extend: {} },
  plugins: [],
}
