# @wuyangfan/nova-ui

企业级 React 组件库（React 18 + TypeScript + Tailwind v3）。

## 特性

- ESM / CJS 双产物
- TypeScript 完整类型导出
- 受控 / 非受控模式
- forwardRef + A11y + 键盘交互
- SSR 兼容（Next.js）
- 主题系统与暗黑模式

## 安装

```bash
npm i @wuyangfan/nova-ui
```

## 使用

```tsx
import '@wuyangfan/nova-ui/styles.css'
import { Button, ThemeProvider } from '@wuyangfan/nova-ui'

export function App() {
  return (
    <ThemeProvider mode="light">
      <Button>Hello Nova UI</Button>
    </ThemeProvider>
  )
}
```

## API 设计规范

`packages/ui` 组件 API 需遵循统一协议，详见：

- [API Conventions](./API_CONVENTIONS.md)
