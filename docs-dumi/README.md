# Nova UI · dumi 文档

本目录为默认文档站点（根目录 **`npm run dev:docs`** / **`npm run build:docs`**）。OpenSpec 背景见 [migrate-docs-to-dumi](../../openspec/changes/migrate-docs-to-dumi/design.md)；任务勾选见 [tasks.md](../../openspec/changes/migrate-docs-to-dumi/tasks.md)。

**P0**：`base=/react-ui-library/`、`@wuyangfan/nova-ui`、`styles.css` 已验证。**P1**：导航/指南与示例范式已落地。**P2（文档页）**：侧边栏所列组件均已提供独立 `demos/*.tsx` + Markdown（详见 OpenSpec **[route-mapping.md](../../openspec/changes/migrate-docs-to-dumi/route-mapping.md)**）。原 **VitePress** 站点已迁至 **`archive/vitepress-site/`**（可选对照），见 **[tasks.md](../../openspec/changes/migrate-docs-to-dumi/tasks.md)**。

## 前置条件

组件库需先产出 `dist`（含 `styles.css`）：

```bash
# 仓库根目录
npm run build:ui
```

## 本地开发

```bash
# 仓库根目录（会先 build:ui，再启动 dumi）
npm run dev:docs
```

浏览器访问控制台输出的地址；若配置了 `base`，一般为 **`http://localhost:<port>/react-ui-library/`**（端口以终端为准，多为 **8000**）。

历史 **VitePress + react-live** 快照位于 **`archive/vitepress-site/`**（不再纳入根 workspace）；按需对照时见该目录 **[README.md](../archive/vitepress-site/README.md)**。

## 构建静态站点

```bash
npm run build:ui
npm run build:docs
```

产物输出至 **`docs-dumi/dist/`**（根 `.gitignore` 已忽略）；部署须匹配 **`base=/react-ui-library/`**。

### 暗色模式（与 Nova UI）

站点顶部配色切换由 dumi 写入 **`html[data-prefers-color]`**；组件库样式来自 Tailwind **`darkMode: 'class'`**（依赖祖先 **`class="dark"`**）。**`.dumi/app.tsx`** 中将二者同步，切换暗色后 Markdown 与 demo 预览区应与组件 **dark:** 类一致。验收：任意组件页打开配色切换，正文与预览区背景/边框应变暗且无「浅色卡片贴在深色页」的割裂感。

### Tailwind 构建告警

仓库根目录 `npm run build:docs` 时，Umi 会读取 **`tailwind.config.cjs`**（与本目录 `docs/`、`.dumi/` 对齐）以避免主题链路上「`content` 为空」类告警。组件外观仍以 **`@wuyangfan/nova-ui/styles.css`** 为准。

### iframe 隔离预览（复杂 Layout / fixed 定位）

对 **Layout**、全屏 **Modal**、或依赖视口的 demo，可在 Markdown 的 `<code>` 上增加 **`iframe`**（高度数值或 `true`），与文档壳层隔离，详见官方 [**Demo 配置 · iframe**](https://d.umijs.org/config/demo#iframe)。本站 **`docs/components/layout.md`** 已示例。

切换暗色时，iframe 内文档与外层独立；若发现 iframe 内主题不同步，优先升级/对照 dumi 行为或在非 iframe 下补充示例。

### 构建偶发 ENOENT（`.dumi/tmp-production`）

若 **`dumi build`** 报大量 **`tmp-production/dumi/theme/...` 文件缺失** 或 **`@wuyangfan/nova-ui/styles.css` 无法解析**，多为缓存目录不完整。可在仓库根执行：

```bash
rm -rf docs-dumi/.dumi/tmp-production docs-dumi/node_modules/.cache
npm run build
```

## API 参考（TypeDoc 生成）

组件导出类型的 Markdown 索引由 **TypeDoc** 生成（配置见 **`packages/ui/typedoc.json`**，入口 **`src/index.ts`**，与 **`dist/index.d.ts`** 同源）。

```bash
# 仅生成 API Markdown（写入 docs-dumi，目录见根 .gitignore）
npm run docs:api

# 构建文档站前会自动执行 docs:api（根目录 build:docs 已链接）
npm run build:docs
```

生成路径：**`docs-dumi/docs/develop/api-reference/`**（勿提交）。站点侧栏与顶栏 **API** → **`/develop/api-reference`**。

### Playground（react-live）

**`/playground`** 提供可编辑示例，依赖 **`react-live`**（仅文档 workspace，不进入组件库 bundle）。修改默认片段：编辑 **`docs/demos/playground-live.tsx`** 中的 **`INITIAL_CODE`**。

## 依赖安装与 esbuild

仓库根 **`package.json`** 含 **`overrides` → `esbuild: 0.21.4`**，用于消除 `dumi` / Umi 与 hoisted **`esbuild`** 版本不一致导致的安装失败（如 `Expected "0.21.4" but got "0.27.4"`）。升级依赖后若再现问题，请在本机 **`rm -rf node_modules package-lock.json && npm install`** 后再提交 lockfile（团队须对齐）。

若 **`npmmirror`** 出现 tarball corrupted / ENOENT，可改用：

```bash
npm install --registry=https://registry.npmjs.org/
```

## 与归档 VitePress 的关系

- 默认贡献与 CI 仅使用本站 **dumi + 文件 demo**。
- 旧版内联 **`<LivePlayground>`** 站点已迁至 **`archive/vitepress-site/`**，不再提供根目录 **`npm run dev:docs:vitepress`** 脚本。
