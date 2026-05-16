# Tasks：迁移文档至 dumi

> 与 **[proposal.md](./proposal.md)**、**[design.md](./design.md)** 配合使用；勾选表示完成。

## P0 — POC（Go / No-go）

- [x] 选定 `dumi` 版本范围并记录于 `docs-dumi/package.json`（或等价目录）。（当前 **`dumi`: `^2.4.23`**，构建日志 **dumi v2.4.23**。）
- [x] 新建最小 dumi 工程：`docs-dumi/`（`.dumirc.ts`、`docs/`、`package.json`、`file:` 依赖、`/.dumi/app.tsx` 全局样式）。
- [x] 验证引入 **`dist/styles.css`** 后组件样式正确（依赖本机 **`npm install` + `npm run build:ui`** 成功）。（**`.dumi/app.tsx`** 已 `import '@wuyangfan/nova-ui/styles.css'`；**`npm run build:docs:dumi`** 已通过。）
- [x] 验证 **`base: /react-ui-library/`** 下静态资源路径（生产 build + `preview`）。（生产 **`dist/index.html`** 中脚本/样式为 **`/react-ui-library/…`**；可用 **`npm run preview --workspace @wuyangfan/nova-ui-docs-dumi`** 本地验货。）
- [x] 输出 POC 结论：**继续 / 调整方案 / 暂停**。（**继续**：P1 可推进导航迁移与更多组件 demo；~~Tailwind `content` 警告~~ 已在 **`docs-dumi/tailwind.config.cjs`** 收敛。）

## P1 — 站点骨架

- [x] 落位 Monorepo workspace 与根脚本 **`dev:docs` / `build:docs`**（默认指向 dumi；原 VitePress 脚本已移除，站点迁至 **`archive/vitepress-site/`**）。
- [x] 迁移 **导航与侧边栏**（对照 `.vitepress/config.ts`，见 **`docs-dumi/.dumirc.ts`**）。
- [x] 迁移 **指南**若干页（**`docs-dumi/docs/guide/*`**）。
- [x] 选 **Button、Form、Container** 完成 **demo 文件 + 文档页** 范式；后续全量组件页已在 **P2** 按同一范式补齐（见 **[route-mapping.md](./route-mapping.md)**）。
- [x] 更新 **AGENTS.md** 与 **`docs-dumi/README.md`** 中的文档命令与 URL 说明。
- [x] `npm run build`（`build:ui && build:docs`，即 dumi）通过。

## P2 — 全量迁移与下线 VitePress

- [x] **路由对照表**：旧 URL → 新 URL，核心页人工点开验收。（见 **[route-mapping.md](./route-mapping.md)**；slug 与 base 不变，对照表 + 验收清单已写。）
- [x] **批量迁移组件文档与 demo**：侧边栏所列组件均已文件化 demo + Markdown；清单见 **[route-mapping.md](./route-mapping.md)**「已按 dumi 范式迁移」。
- [x] **删除或归档** 遗留 **`docs/`（VitePress）**、**`.vitepress`** 与 **`LivePlayground`**：已迁至 **`archive/vitepress-site/`**，并从根 **`package.json` workspaces** 与 **`dev:docs:vitepress` / `build:docs:vitepress`** 脚本移除；按需本地运行见该目录 **README**。
- [x] 暗色主题与预览区样式回归（抽样）：**`.dumi/app.tsx`** 同步 **`data-prefers-color`** → **`html.dark`**，与 Nova UI Tailwind 暗色策略对齐；手工切换配色验收若干组件页（详 **`docs-dumi/README.md`**）。
- [x] CI 更新（若有单独 docs job）。（**`.github/workflows/ci.yml`** 已使用根脚本 **`build:docs`**；**`docs-deploy.yml`** 产物路径已改为 **`docs-dumi/dist`**。）

## P3 — 增强（可选）

> 与默认文档管线解耦；需要时在独立变更中立项（评估包体与维护成本）。

- [x] Live 编辑（react-live 或 dumi 生态方案）与包体评估：**`react-live`** 仅装在 **`docs-dumi`**（`package.json` dependencies）；**`/playground`** 使用 **`playground-live.tsx`**（客户端挂载 + `LiveProvider`）；不影响 **`@wuyangfan/nova-ui`** 发布包。
- [x] iframe 预览模式（复杂布局组件）：已在 **`docs/components/layout.md`** 对 Layout demo 启用 **`iframe`**，并在 **`docs-dumi/README.md`** 说明用法与官方文档链接。
- [x] API 参考自动生成：**TypeDoc** + **`typedoc-plugin-markdown`**，配置 **`packages/ui/typedoc.json`** / **`tsconfig.typedoc.json`**；生成目录 **`docs-dumi/docs/develop/api-reference/`**（gitignore，**`npm run build:docs`** / **`npm run docs:api`** 会先产出）；站点导航 **API** → **`/develop/api-reference`**。

## 门禁（每阶段合并前）

- [x] `npm run lint:ui`（合并前执行；与 UI 源码变更与否无关）
- [x] `npm run build:ui && npm run build:docs`
