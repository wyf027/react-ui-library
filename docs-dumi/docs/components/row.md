---
title: Row 行
---

# Row 行

配合 Col 使用的栅格行组件。`gap` 支持单个数字或 `[水平间距, 垂直间距]`（与 Ant Design `Row` 的 `gutter` 语义一致：横向排列时为列间距与换行后的行间距）。

## 示例

<code src="./demos/row-col-span.tsx"></code>

### 二维间距（对标 Ant Design gutter）

<code src="./demos/row-gap-wrap.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 间距；支持 `[水平, 垂直]` | `number \| [number, number]` | `12` |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` |
| wrap | 是否换行 | `boolean` | `true` |
