# Collapse 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Collapse/Collapse.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Collapse` |
| 路径 | `packages/ui/src/components/navigation/Collapse` |
| 依赖 | `cn`、`useControllableState` |

## 2. 目标与非目标

**目标**：**`items`** 每项 **卡片**：**`button` 头** **`onClick`→`toggle(key)`** + **展开区 `content`**；**`useControllableState<string[]>`**（**`activeKey`/`defaultActiveKey`/`onChange`**）；**`accordion`**：**最多一项** **`[key]` 或 `[]`**；否则 **多开**：**`toggle`** 在列表上 **增删 key**。  
**非目标**：无 **`destroyInactivePanel`**、无 **动画 height**、无 **`ghost` 变体**。

## 5–6

**`current: string[]`** 存 **展开 key 列表**。

## 7. API

**`CollapseItem`**：**`key`/`title`/`content`/`disabled?`**；**`accordion?`**；**`defaultActiveKey`** 默认 **`[]`**。

## 8. Ref

**`HTMLDivElement`**。

## 9. 无障碍

**头为 `button`** ✓；**无 `aria-expanded`/`aria-controls`** 在头与面板间 **显式关联**。

## 14. 风险

**`toggle` 非 accordion** 使用 **`current.filter`** — **须** **`current` 为最新**（**`useControllableState` 保证**）；**`+`/`−` 符号** **无 i18n**。

## 15. 结论

**手风琴/多开** 折叠面板 MVP。

## 附录 B

`Collapse.tsx`。
