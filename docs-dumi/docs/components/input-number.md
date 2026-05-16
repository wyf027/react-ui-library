---
title: InputNumber 数字输入
---

# InputNumber 数字输入

带步进按钮的数字输入，支持最值、步长、精度与控制按钮显隐。

## 示例

<code src="./demos/input-number-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `number` | - |
| defaultValue | 初始值 | `number` | - |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| precision | 小数精度 | `number` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| controls | 是否显示 +/- | `boolean` | `true` |
| placeholder | 占位符 | `string` | - |
| disabled | 禁用 | `boolean` | `false` |
| onChange | 变更回调（清空等为 `null`） | `(value: number \| null) => void` | - |

其余属性继承外层容器 `div`（`className` 等）。
