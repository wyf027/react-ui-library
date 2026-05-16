---
title: 快速开始
---

# 快速开始

## 安装依赖

```bash
npm install
```

## 本地开发文档（dumi）

```bash
npm run dev:docs
```

上述命令会先构建组件库再启动 dumi（端口以终端输出为准，多为 **8000**，访问路径含 **`/react-ui-library/`** base）。

若需对照旧版 **VitePress + react-live** 内联示例，见仓库 **`archive/vitepress-site/README.md`**（已移出 npm workspace，需在该目录单独 `npm install` 后运行）。

## 构建组件库

```bash
npm run build:ui
```

## 在业务项目中接入

```text
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
