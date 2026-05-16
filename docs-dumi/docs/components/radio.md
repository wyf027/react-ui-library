---
title: Radio 单选框
---

# Radio 单选框

单选按钮；同一组请使用相同的 `name`，并在父级维护选中值（或通过表单上下文）。

## 示例

<code src="./demos/radio-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 文案 | `ReactNode` | - |
| value | 选项值 | `string \| number`（透传至 input） | - |
| onChange | 选中时回调当前项 `value` | `(value: string) => void` | - |
| disabled | 禁用 | `boolean` | - |

其余属性继承原生 `input`（`name`、`className` 等）。
