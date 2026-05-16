---
title: Container 布局容器
---

# Container 布局容器

用于包裹页面内容，提供与常见设计系统相近的**最大宽度**、**内边距**与**语义化根节点**能力；与 Layout 页面骨架组合时负责内容区「版心」。

## 示例

<code src="./demos/container-default.tsx"></code>

### 最大宽度与全宽

<code src="./demos/container-maxwidth.tsx"></code>

### 语义化根节点（如 `main`）

<code src="./demos/container-main.tsx"></code>

## API

除下表外，还支持原生 HTML 属性（如 `id`、`style`、`role`、`aria-*` 等）。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根元素类型 | `React.ElementType` | `'div'` |
| fluid | 是否取消版心最大宽度（仍保留水平 `padding`） | `boolean` | `false` |
| centered | 有版心时是否水平居中（`mx-auto`） | `boolean` | `true` |
| maxWidth | 版心最大宽度预设（`fluid` 为 true 时不生效） | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | `'xl'` |
| padding | 水平内边距预设 | `'none' \| 'sm' \| 'md' \| 'lg'` | `'lg'` |
| verticalPadding | 垂直内边距预设 | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
