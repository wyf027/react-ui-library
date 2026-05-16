---
title: Rate 评分
---

# Rate 评分

星级评分；支持自定义星星数量，可选点击当前分值清空（`allowClear`）。

## 示例

<code src="./demos/rate-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 星星数量 | `number` | `5` |
| value | 受控分值（1…count） | `number` | - |
| defaultValue | 初始分值 | `number` | `0` |
| disabled | 禁用 | `boolean` | - |
| allowClear | 再次点击当前星是否清零 | `boolean` | `true` |
| onChange | 变更回调 | `(value: number) => void` | - |

其余属性继承外层容器 `div`（`className` 等）。
