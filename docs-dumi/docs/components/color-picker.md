---
title: ColorPicker 颜色选择
---

# ColorPicker 颜色选择

原生 `<input type="color">` 封装，可选展示当前色值的十六进制字符串。

## 示例

<code src="./demos/color-picker-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控颜色值 | `string`（如 `#2459ff`） | - |
| defaultValue | 初始颜色 | `string` | `#2459ff` |
| showValue | 是否展示色值文本 | `boolean` | `true` |
| onChange | 变更回调 | `(value: string) => void` | - |
| disabled | 禁用 | `boolean` | - |

其余属性继承原生 `input`（`className` 等；`type` 固定为 `color`）。
