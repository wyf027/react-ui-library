# Descriptions 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/Descriptions/Descriptions.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Descriptions` |
| 路径 | `packages/ui/src/components/data/Descriptions` |
| 依赖 | `cn` |

## 2. 目标与非目标

**目标**：**`<dl>`** + **`grid`** 展示 **`items[]`**（**`label`→`dt`、`children`→`dd`**），**`columns`**（默认 **3**）控制 **`gridTemplateColumns: repeat(n, minmax(0,1fr))`**。  
**非目标**：无 `colon`/`layout`/`bordered` Ant 全量 API；**每项外层用 `div` 包 `dt/dd`**（非 `display: contents` 严格 dl 子节点结构）。

## 4. DOM

**`<dl ref ref className grid ... style={{gridTemplateColumns}}>`** → **`items.map`** → **`<div key>`** → **`dt` + `dd`**。

## 5–6. 无状态；数据

**`items` 父传**；**`DescriptionItem.key`** 作 **React `key`**。

## 7. API

`items: DescriptionItem[]`（**`key`/`label`/`children`**）；**`columns?: number`**；**`HTMLAttributes<HTMLDListElement>`** 透传 **`dl`**。

## 8. Ref

**`HTMLDListElement`** → **`dl`**。

## 9. 无障碍

**语义正确**：**`dt`/`dd`**；建议 **成对** 且 **`dt` 与 `dd` 一一对应**（当前结构满足）。

## 14. 风险

**`grid` 直接作用于 `dl`**，内部 **`div` 包裹** 在 **HTML 校验器** 中或报 **dl 子元素非 dt/dd**（浏览器通常宽容）；演进可考虑 **`display:contents`** 或 **改 `div` 根**。

## 15. 结论

**描述列表** 轻量实现，适合 **键值栅格**。

## 附录 A

职责·键值栅格 | DOM·dl+grid+div包dt/dd | Ref·dl

## 附录 B

`Descriptions.tsx`。
