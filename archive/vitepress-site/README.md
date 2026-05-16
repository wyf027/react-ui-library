# 遗留 VitePress 文档（归档）

本目录为迁移至 **dumi**（仓库 **`docs-dumi/`**）之前的文档站快照，内含 **`<LivePlayground>`（react-live）**。默认 npm workspace 与根脚本 **不再**包含本站；日常贡献请以 **`docs-dumi/`** 与 **`npm run dev:docs`** 为准。

## 何时还需要打开本目录

- 对照旧版内联 `<LivePlayground>` 示例字符串；
- 评估是否要把「可编辑示例」以其他方案（P3）接回 dumi。

## 本地运行（可选）

在**仓库根目录**先构建组件库，再在本目录单独安装依赖（已从根 workspace 移除）：

```bash
# 仓库根目录
npm run build:ui

cd archive/vitepress-site
npm install
npm run dev
```

预览地址一般为 **`http://localhost:5173/react-ui-library/`**（与旧 base 一致）。

`package.json` 中 **`@wuyangfan/nova-ui`** 指向 **`file:../../packages/ui`**；若解析失败，确认已在根目录执行 **`npm run build:ui`**。

迁移背景见仓库根目录 **`openspec/changes/migrate-docs-to-dumi/tasks.md`**。
