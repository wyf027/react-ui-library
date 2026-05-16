---
title: Flex 弹性布局
---

# Flex 弹性布局

基于 CSS Flexbox 的弹性布局容器组件，类似 Ant Design Flex。

## 示例

<code src="./demos/flex-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 主轴方向 | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` |
| vertical | 是否垂直方向（等价 direction='column'） | `boolean` | `false` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | - |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - |
| wrap | 是否换行 | `boolean` | `false` |
| gap | 间距 | `number \| string` | - |
| inline | 是否 `inline-flex` | `boolean` | `false` |
