# @wuyangfan/nova-ui Monorepo

企业级 React 组件库工程，包含：

1. `packages/ui`：可发布的组件库包 `@wuyangfan/nova-ui`
2. `docs-dumi`：**dumi** 文档站（默认：`npm run dev:docs` / `npm run build:docs`）
3. `archive/vitepress-site`：迁移前的 **VitePress + react-live** 快照（非 npm workspace，按需本地运行；见该目录 README）

## 规格驱动开发（OpenSpec + Spec Kit）

| 工具 | 目录 | 典型入口 |
| --- | --- | --- |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | `openspec/changes/` | Cursor：`/opsx:propose`、`/opsx:apply` |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | `.specify/`、功能产物 `specs/` | Cursor：`/speckit-specify` → plan → tasks → implement |

项目章程：**`.specify/memory/constitution.md`**；OpenSpec 上下文：**`openspec/config.yaml`**。详见 **`AGENTS.md`** 与 **`specs/README.md`**。

## 技术栈

- React 18 + TypeScript
- Tailwind CSS v3
- ESLint + Prettier
- tsup（ESM/CJS + d.ts）
- **dumi** 文档（默认）；旧版 VitePress 见 **`archive/vitepress-site/`**

## 本地开发

```bash
npm install
npm run dev:docs
```

## 构建

```bash
npm run build:ui
npm run build:docs
npm run build
```

## 发布 npm

当前仓库已配置 GitHub Actions 自动发布流程：

- 触发条件：push 到 `main`
- 流程：安装依赖 -> 构建 UI 包 -> 若版本未发布则自动 `npm publish`

你需要在 GitHub 仓库 Secrets 中配置：

- `NPM_TOKEN`：具有发布 `@wuyangfan/nova-ui` 权限的 npm token（建议 granular token，支持 bypass 2FA）

## 发布文档到 GitHub Pages

仓库已包含自动部署工作流 [`.github/workflows/docs-deploy.yml`](.github/workflows/docs-deploy.yml)。

1. push 到 `main` 后会自动构建并上传 **`docs-dumi/dist`**（dumi 产物）。
2. 在 GitHub 仓库设置中打开 `Settings -> Pages -> Source: GitHub Actions`。
3. 发布地址为：`https://leno23.github.io/react-ui-library/`。

## 包使用方式

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
