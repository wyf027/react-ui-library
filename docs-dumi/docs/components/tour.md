---
title: Tour 漫游式引导
---

# Tour 漫游式引导

漫游式引导组件；点击下方按钮打开全屏遮罩步骤卡片。

## 示例

<code src="./demos/tour-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 引导步骤 | `TourStep[]` | - |
| open | 是否显示（受控） | `boolean` | - |
| defaultOpen | 默认显示 | `boolean` | `false` |
| current | 当前步骤（受控） | `number` | - |
| defaultCurrent | 初始步骤 | `number` | `0` |
| onChange | 步骤变化回调 | `(current: number) => void` | - |
| onClose | 关闭回调 | `() => void` | - |
