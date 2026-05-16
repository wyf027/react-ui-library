---
title: Cascader 级联选择
---

# Cascader 级联选择

多级 `<select>` 串联；选中路径为各级 `value` 组成的数组，`onChange` 同时给出对应各级文案。

## 示例

<code src="./demos/cascader-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 树形选项 | `CascaderOption[]` | - |
| value | 受控路径（各级 value） | `string[]` | - |
| defaultValue | 初始路径 | `string[]` | `[]` |
| onChange | 路径与标签 | `(value: string[], labels: string[]) => void` | - |

`CascaderOption`：`{ value: string; label: string; children?: CascaderOption[]; disabled?: boolean }`。

其余属性继承外层容器 `div`（`className` 等）。
