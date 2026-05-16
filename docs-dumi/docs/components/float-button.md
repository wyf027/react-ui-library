---
title: FloatButton 悬浮按钮
---

# FloatButton 悬浮按钮

固定在页面角落的悬浮按钮；示例容器内通过 **`className`** 改为 **`absolute`**，便于在预览区观察。

## 示例

<code src="./demos/float-button-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | `ReactNode` | - |
| tooltip | 提示文字（**`title`**） | `string` | - |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| position | 距右侧、底部偏移（px） | `{ right?: number; bottom?: number }` | `{ right: 24, bottom: 24 }` |
