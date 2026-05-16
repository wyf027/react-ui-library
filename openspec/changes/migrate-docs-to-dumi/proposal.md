## Why

> **状态**：变更已完成（分阶段任务见 **`tasks.md`**，均已勾选）。
>
> **结论**：默认文档工程已切换为 **`docs-dumi/`（dumi）**；原 **VitePress** 树归档于 **`archive/vitepress-site/`**。以下仍为立项时的背景说明。

立项时，文档站曾以 **VitePress + `LivePlayground`（react-live）** 为主，示例多为 Markdown 内联字符串，与 Ant Design 等成熟组件库常用的 **dumi + 独立 demo 源码文件** 模型不一致，会带来示例难版本管理、难类型检查、复制粘贴路径与真实导入不对称等问题；团队据此评估并推进迁移 **dumi**（现已由 **`docs-dumi/`** 承载）。

## What Changes

- **文档站点技术栈**：自 **`docs/`（VitePress）** 迁移至 **dumi 站点工程**（建议仍为 workspace 子包，例如保留 `@wuyangfan/nova-ui-docs` 名称或重命名为符合 dumi 习惯的目录名）。
- **示例模型**：引入 **文件级 demo**（`demo/*.tsx` 或与组件对齐的目录约定），文档 Markdown 通过 dumi 机制引用 demo；可选保留 **Live / 可编辑** 能力（见详细设计）。
- **构建与脚本**：根目录 `package.json` 中 **`dev:docs` / `build:docs`** 改为调用 dumi；保留 **`build:ui` 先于文档** 的门禁。
- **部署与 base**：保留现有 **`/react-ui-library/`** 级 base（若部署路径不变），在 dumi 配置中等效实现。

## Non-goals（本提案默认不包含）

- **不**在本次迁移中重做全部组件实现或变更 `@wuyangfan/nova-ui` 公共 API。
- **不**强制一次迁移完全部组件文档页；允许分阶段「骨架站点 + 分批搬运」。
- **不**承诺与 Ant Design 官网像素级一致；仅对齐 **管线能力**（demo 文件化、预览壳、主题扩展点）。

## Capabilities

### New Capabilities

- `docs-site-dumi`: Dumi-based Nova UI docs workspace, `@wuyangfan/nova-ui` consumption, `base` deployment — **[specs/docs-site-dumi/spec.md](./specs/docs-site-dumi/spec.md)**.
- `docs-demo-source-files`: File-based demos, public import rules, global styles for previews — **[specs/docs-demo-source-files/spec.md](./specs/docs-demo-source-files/spec.md)**.

### Modified Capabilities

- `docs-dev-workflow`: Root scripts and contributor docs switch from VitePress to dumi (detail in capability specs above).

## Impact

- **仓库**：新增/替换 `docs` workspace 或并行目录（双站点过渡期可选）；删除或归档 `.vitepress`。
- **CI / 部署**：构建命令与静态资源 base 需对齐；若有 GitHub Pages / 自定义域名需回归。
- **贡献者**：文档编写方式从内联 `<LivePlayground>` 转为 **demo 文件 + Markdown**，学习曲线变更。
- **破坏性**：对 **终端用户 npm 包无 BREAKING**；对 **文档维护者** 为流程破坏性变更，需迁移指南。

## References

- 详细技术方案：**[design.md](./design.md)**
- 分阶段任务清单：**[tasks.md](./tasks.md)**
- Capability 规范：**[specs/docs-site-dumi/spec.md](./specs/docs-site-dumi/spec.md)**、**[specs/docs-demo-source-files/spec.md](./specs/docs-demo-source-files/spec.md)**
