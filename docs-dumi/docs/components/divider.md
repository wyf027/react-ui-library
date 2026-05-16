---
title: Divider 分割线
---

# Divider 分割线

区隔内容的分割线，API 贴近 Ant Design `Divider`。

## 示例

<code src="./demos/divider-basic.tsx"></code>

### 文案与样式

<code src="./demos/divider-variants.tsx"></code>

## API

根节点为 `div`（`role="separator"`），便于组合文案与样式。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| orientation | 横向或纵向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| variant | 线型 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| plain | 减小外边距 | `boolean` | `false` |
| titlePlacement | 横向且存在 `children` 时文案位置（对标 Ant Design 文案分割线） | `'start' \| 'center' \| 'end'` | `'center'` |
