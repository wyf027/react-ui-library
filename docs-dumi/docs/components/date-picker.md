---
title: DatePicker 日期选择
---

# DatePicker 日期选择

基于原生 `<input type="date">`，值为浏览器约定的日期字符串（通常为 `YYYY-MM-DD`）。

## 示例

<code src="./demos/date-picker-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | - |
| defaultValue | 初始值 | `string` | `''` |
| onChange | 变更回调 | `(value: string) => void` | - |
| disabled | 禁用 | `boolean` | - |

其余属性继承原生 `input`（`className`、`placeholder` 等；注意 `type` 固定为 `date`）。
