---
title: Steps 步骤条
---

# Steps 步骤条

引导用户按照流程完成任务的步骤条。

## 示例

<code src="./demos/steps-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤项 | `StepItem[]` | - |
| current | 当前步骤索引（从 **0** 开始） | `number` | `0` |

`StepItem` 还可选 **`description`**。
