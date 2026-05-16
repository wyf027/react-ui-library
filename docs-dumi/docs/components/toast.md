---
title: Toast 轻提示
---

# Toast 轻提示

全局轻提示消息（固定定位于视口右下角；示例中通过 `className` 覆盖为文档流内展示）。

## 示例

<code src="./demos/toast-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | `false` |
| duration | 显示时长(ms)，到期触发 `onClose` | `number` | `2500` |
| status | 状态色板 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| onClose | 关闭回调 | `() => void` | - |
