---
title: FloatButton 悬浮按钮
---

固定在页面角落的悬浮按钮，对齐 Ant Design FloatButton。

## 示例

<code src="../demos/float-button-1.tsx"></code>

## 可访问性

`FloatButton` 通常只展示图标或简短符号。传入 `tooltip` 时，组件会同时设置原生 `title` 和默认 `aria-label`，让图标按钮拥有稳定的可访问名称。若需要提供更明确的读屏文本，可传入 `aria-label` 覆盖 `tooltip` 作为按钮名称。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | `ReactNode` | - |
| tooltip | 提示文字，也会作为默认可访问名称 | `string` | - |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| position | 位置 | `{ right?: number; bottom?: number }` | `{ right: 24; bottom: 24 }` |
| aria-label | 按钮可访问名称，优先级高于 `tooltip` | `string` | - |
