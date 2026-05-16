---
title: Typography 排版
---

# Typography 排版

文本的基本格式，包含 Title、Text、Paragraph 三个子组件。

## 示例

<code src="./demos/typography-basic.tsx"></code>

## API

### Title

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5` | `2` |
| ellipsis | 单行省略（**`min-w-0 truncate`**）。`children` 为字符串且未传 **`title`** 时，自动设置原生 **`title`** 以便悬停查看全文 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |

其余 **`HTMLHeadingElement`** 属性透传（如 **`id`**、显式 **`title`** 覆盖自动 tooltip）。

### Text

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ellipsis | 同上，单行省略与可选原生 **`title`** | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| children | 内容 | `ReactNode` | - |

其余 **`HTMLSpanElement`** 属性透传。

### Paragraph

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | - |
| children | 内容 | `ReactNode` | - |
