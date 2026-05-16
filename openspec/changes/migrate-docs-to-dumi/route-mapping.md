# 路由对照（VitePress → dumi）

站点 **`base`** 均为 **`/react-ui-library/`**。下列路径在两端 **pathname 一致**（仅构建管线不同），迁移完成的页面可直接对照验收。

| 说明 | 路径 |
| --- | --- |
| 首页 | `/` |
| 指南 | `/guide/introduction`、`/guide/getting-started`、`/guide/docs-optimization-todo` |
| 组件概览 / Playground | `/components/overview`、`/playground` |
| API（TypeDoc 生成，构建时写入） | `/develop/api-reference` |
| 已按 dumi 范式迁移（独立 demo） | `/components/button`、`/components/container`、`/components/form`、`/components/input`、`/components/modal`、`/components/table`、`/components/select`、`/components/drawer`、`/components/tabs`、`/components/dropdown`、`/components/menu`、`/components/breadcrumb`、`/components/collapse`、`/components/steps`、`/components/tree`、`/components/anchor`、`/components/affix`、`/components/back-top`、`/components/float-button`、`/components/alert`、`/components/toast`、`/components/tooltip`、`/components/popover`、`/components/popconfirm`、`/components/loading`、`/components/spin`、`/components/skeleton`、`/components/notification`、`/components/tour`、`/components/watermark`、`/components/layout`、`/components/icon`、`/components/typography`、`/components/row`、`/components/col`、`/components/grid`、`/components/flex`、`/components/space`、`/components/divider`、`/components/split-pane`、`/components/card`、`/components/list`、`/components/tag`、`/components/badge`、`/components/avatar`、`/components/image`、`/components/pagination`、`/components/progress`、`/components/statistic`、`/components/descriptions`、`/components/empty`、`/components/result`、`/components/timeline`、`/components/qrcode`、`/components/image-preview`、`/components/virtual-list`、`/components/checkbox`、`/components/radio`、`/components/switch`、`/components/date-picker`、`/components/time-picker`、`/components/slider`、`/components/rate`、`/components/upload`、`/components/calendar`、`/components/transfer`、`/components/cascader`、`/components/tree-select`、`/components/color-picker`、`/components/segmented`、`/components/mentions`、`/components/auto-complete`、`/components/input-number`、`/components/carousel` |

**本地**

- **dumi（默认）**：`npm run dev:docs` → 默认端口见终端（多为 8000），访问 **`http://localhost:<port>/react-ui-library/`**。
- **VitePress（已归档）**：历史站点位于 **`archive/vitepress-site/`**，不再通过根目录 npm script 启动；按需在该目录单独安装依赖后运行（见其中 **README**）。
