---
title: Checkbox 多选框
---

# Checkbox 多选框

基于原生 `<input type="checkbox">` 的多选控件，支持受控/非受控与自定义文案。

## 示例

<code src="./demos/checkbox-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 文案 | `ReactNode` | - |
| checked | 受控勾选 | `boolean` | - |
| defaultChecked | 初始勾选 | `boolean` | `false` |
| onChange | 变更回调（布尔值） | `(checked: boolean) => void` | - |
| disabled | 禁用 | `boolean` | - |

其余属性继承原生 `input`（`className`、`id` 等）。
