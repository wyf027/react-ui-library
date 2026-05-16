---
title: TimePicker 时间选择
---

# TimePicker 时间选择

下拉选择时间（内部维护面板打开状态），值格式为 `HH:mm`（24 小时）或按 `format` 区分展示逻辑。

## 示例

<code src="./demos/time-picker-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | - |
| defaultValue | 初始值 | `string` | `''` |
| format | 12/24 小时制 | `'12' \| '24'` | `'24'` |
| placeholder | 占位文案 | `string` | `'选择时间'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用 | `boolean` | `false` |
| onChange | 变更回调 | `(value: string) => void` | - |

其余属性继承外层容器 `div`（`className` 等）。
