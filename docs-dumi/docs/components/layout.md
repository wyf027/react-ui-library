---
title: Layout 页面骨架
---

# Layout 页面骨架

用于搭建中后台常见的**顶栏 + 侧栏 + 内容区**结构，与 [Container](./container.md) 互补：`Layout*` 负责**区域与折叠**，`Container` 负责**版心与内边距**。

## 示例

以下示例使用 **iframe 渲染**（与文档壳层隔离，避免 `position: fixed` / 全屏类 demo 受侧栏影响）。高度可按需调整 `iframe` 数值。

<code src="./demos/layout-basic.tsx" iframe="380"></code>

### 与 Container 组合

<code src="./demos/layout-with-container.tsx" iframe="420"></code>

## API

除下表外，各组件还支持对应原生 HTML 属性（如 `id`、`style`、`role`、`aria-*` 等）。

### Layout

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | `vertical` 为整页纵向壳；`horizontal` 为侧栏+内容一行 | `'vertical' \| 'horizontal'` | `'vertical'` |
| className | 自定义类名 | `string` | - |

### LayoutHeader

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'header'` |
| className | 自定义类名 | `string` | - |

### LayoutSider

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'aside'` |
| width | 展开宽度（px） | `number` | `220` |
| collapsedWidth | 折叠宽度（px） | `number` | `64` |
| collapsible | 是否展示折叠按钮 | `boolean` | `false` |
| collapsed | 受控折叠 | `boolean` | - |
| defaultCollapsed | 非受控初始折叠 | `boolean` | `false` |
| onCollapse | 折叠状态变化 | `(collapsed: boolean) => void` | - |
| triggerSlot | 折叠按钮旁附加节点 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |

### LayoutContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'main'` |
| className | 自定义类名 | `string` | - |
