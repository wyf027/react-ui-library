# Breadcrumb 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Breadcrumb/Breadcrumb.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Breadcrumb` |
| 路径 | `packages/ui/src/components/navigation/Breadcrumb` |

## 2. 目标与非目标

**目标**：**`<nav aria-label="Breadcrumb">`** + **`<ol className="flex">`**；**`items`**：**`href` 则 `<a>`**，**否则 `<button type="button">`**；**`separator`**（默认 **`/`**）。  
**非目标**：无 **`aria-current="page"`** 最后一项、无 **下拉溢出**。

## 4. DOM

**`nav` > `ol` > `li`** 每项 **链接或按钮** + **分隔 `span`**（**末项无分隔**）。

## 7. API

**`BreadcrumbItem`**：**`key`/`label`/`href?`/`onClick?`**；**`separator?: ReactNode`**；**`HTMLAttributes<HTMLElement>`**（**`ref`→`nav`**）。

## 8. Ref

**`HTMLElement`** → **`nav`**（**声明合理**）。

## 9. 无障碍

**`nav`+`aria-label`** ✓；**末项** 建议 **`aria-current="page"`** 演进；**无 `href` 仍用 `button`** 即 **无当前页纯 `span`** 缺失。

## 14. 风险

**末级可点 `button`** **语义像链接**；**SEO** 更推荐 **当前页 `span`**。

## 15. 结论

**轻量面包屑**，与 **Router `Link`** 组合时 **优先 `href`**。

## 附录 B

`Breadcrumb.tsx`。
