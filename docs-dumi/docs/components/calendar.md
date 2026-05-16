---
title: Calendar 日历
---

# Calendar 日历

按月展示日期的简易日历；**选中值为字符串** `YYYY-MM-DD`，与 `value` 比较高亮。

## 示例

<code src="./demos/calendar-basic.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| year | 年份 | `number` | 当前年 |
| month | 月份（0–11） | `number` | 当前月 |
| value | 当前选中日期 | `string`（`YYYY-MM-DD`） | - |
| onChange | 选中某日 | `(date: string) => void` | - |

其余属性继承外层容器 `div`（`className` 等）。
