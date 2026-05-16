---
title: Mentions 提及
---

# Mentions 提及

多行文本域；底部根据 `options` 生成简易提示文案（`Suggestions: @alice …`），具体 @ 解析逻辑由业务侧扩展。

## 示例

<code src="./demos/mentions-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 候选列表 | `MentionsOption[]` | `[]` |
| value | 受控文本 | `string` | - |
| defaultValue | 初始文本 | `string` | `''` |
| placeholder | 占位符 | `string` | `'Type @ to mention...'` |
| onChange | 文本变化 | `(value: string) => void` | - |

`MentionsOption`：`{ value: string; label?: string }`。

其余属性继承原生 `textarea`（`className`、`rows` 等）。
