# List 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/List/List.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `List` |
| 路径 | `packages/ui/src/components/data/List` |

## 2. 目标与非目标

**目标**：**`dataSource: ListItem[]`**（**`key`/`content`/可选 `avatar`/`title`/`description`/`extra`**）；**`header`/`footer`**；**`bordered`/`size`**；**`loading`** 时 **文案 `Loading...`**（**非 `Spin`**）；**`grid`** 时 **`grid` 布局** + **`renderItem`** 或 **默认 `defaultRender`**；否则 **`<ul><li>`** **竖线分割**。  
**非目标**：无 **分页**、无 **下拉刷新**。

## 4. DOM

**根 `div`**；**`loading`** → **单 `div` 居中**；**`grid`** → **`div.grid`**；否则 **`ul.divide-y` + `li`**。

## 7. API

见 **`ListItem`/`ListProps`**（**`renderItem`/`grid.cols`/`grid.gap`** 等）。

## 8. Ref

**`HTMLDivElement`**。

## 9. 无障碍

**列表模式** 下 **`ul`/`li`** ✓；**`grid` 模式** **无 `ul`**，**语义为网格**。

## 14. 风险

**`loading` 仅占位字**；**`item.key` 重复** React 警告；**`defaultRender` 与 `renderItem`** 二选一逻辑清晰。

## 15. 结论

**Ant List 子集**：列表/栅格/头脚/加载文案。

## 附录 A

职责·列表/网格 | DOM·ul 或 grid | loading·文本

## 附录 B

`List.tsx`。
