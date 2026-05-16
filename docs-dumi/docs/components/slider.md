---
title: Slider 滑动输入条
---

# Slider 滑动输入条

基于 `<input type="range">` 的滑动条，可选展示当前数值。

## 示例

<code src="./demos/slider-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| value | 受控值 | `number` | - |
| defaultValue | 初始值 | `number` | `0` |
| showValue | 是否展示当前数值 | `boolean` | `true` |
| onChange | 变更回调 | `(value: number) => void` | - |
| disabled | 禁用 | `boolean` | - |

其余属性继承原生 `input`（`className` 等）。
