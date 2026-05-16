# 快速开始

## 安装依赖

```bash
npm install
```

## 本地开发文档

```bash
npm run dev:docs
```

## 构建组件库

```bash
npm run build:ui
```

## 在业务项目中接入

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

## SSR 与 Next.js

组件库不依赖浏览器全局对象进行首屏渲染，Portal 类组件在客户端挂载后再注入 DOM，可直接用于 Next.js。
