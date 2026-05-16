---
title: AutoComplete 自动完成
---

# AutoComplete 自动完成

带下拉建议的输入框；支持简单字符串过滤或自定义 `filterOption`。

## 示例

<code src="./demos/auto-complete-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 候选项 | `AutoCompleteOption[]` | `[]` |
| value | 受控输入值 | `string` | - |
| defaultValue | 初始值 | `string` | `''` |
| filterOption | 是否过滤 / 自定义过滤函数 | `boolean \| ((input: string, option: AutoCompleteOption) => boolean)` | `true` |
| allowClear | 是否展示清空 | `boolean` | `false` |
| onChange | 输入变化 | `(value: string) => void` | - |
| onSelect | 选中某项 | `(value: string) => void` | - |

`AutoCompleteOption`：`{ value: string; label?: string }`。

其余属性继承原生 `input`（`placeholder`、`className`、`disabled` 等）。
