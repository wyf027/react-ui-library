---
title: Space 间距
---

# Space 间距

设置组件之间的间距，用法贴近 Ant Design `Space`。

## 示例

<code src="./demos/space-basic.tsx"></code>

### 预设尺寸与分隔符 `split`

<code src="./demos/space-split.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距：`small` / `middle` / `large`、像素值，或 `[主轴间距, 交叉轴间距]`（与 Ant Design 数组语义一致） | `number \| 'small' \| 'middle' \| 'large' \| [number, number]` | `8` |
| align | 交叉轴对齐 | `'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` |
| split | 子节点之间的分隔内容 | `ReactNode` | - |
| wrap | 横向时是否换行 | `boolean` | `true` |
