---
title: AutoComplete 自动完成
---

输入框自动完成功能，对齐 Ant Design AutoComplete。

## 示例

<code src="../demos/auto-complete-1.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据 | `{ value: string; label?: string }[]` | `[]` |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | `''` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| onSelect | 选中回调 | `(value: string) => void` | - |
| filterOption | 过滤方式 | `boolean \| ((input, option) => boolean)` | `true` |
| allowClear | 允许清除 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | - |
