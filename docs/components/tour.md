---
title: Tour 漫游式引导
---

漫游式引导组件。

## 示例

<code src="../demos/tour-1.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 引导步骤 | `TourStep[]` | - |
| open | 是否显示 | `boolean` | - |
| defaultOpen | 默认显示 | `boolean` | - |
| current | 当前步骤 | `number` | - |
| onChange | 步骤变化回调 | `(current: number) => void` | - |
| onClose | 关闭回调 | `() => void` | - |
