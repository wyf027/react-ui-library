# Timeline 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/Timeline/Timeline.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Timeline` |
| 路径 | `packages/ui/src/components/data/Timeline` |

## 2. 目标与非目标

**目标**：**`<ul>`** 列表，**`items`** 每项 **`li`** **左侧圆点**（**`color`**：**brand/success/warning/danger** → **对应 `bg-*`**）；**`title`/`description`**。  
**非目标**：无 **竖线连接**、无 **时间戳字段**、无 **交替布局**。

## 4. DOM

**`<ul ref list-none space-y-4>`** → **`li.relative.pl-6`** → **绝对定位圆点 `span`** + **标题/描述 `p`**。

## 5–6

无 state；**`items` 父传**。

## 7. API

`TimelineItem`：**`key`/`title`/`description?`/`color?`**；**`HTMLAttributes<HTMLUListElement>`**。

## 8. Ref

**`HTMLUListElement`**。

## 9. 无障碍

**`ul` 非 `list`** 已 **`list-none`**；**无 `role="list"` 显式**；读屏 **列表语义弱**。

## 14. 风险

**无时间轴语义**（**`time`** 元素）；**`key` 须稳定**。

## 15. 结论

**极简时间线外观**，非完整 Timeline 模式库。

## 附录 A

职责·事件列表外观 | DOM·ul/li | Ref·ul

## 附录 B

`Timeline.tsx`。
