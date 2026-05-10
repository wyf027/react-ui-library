# Empty 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/Empty/Empty.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Empty` |
| 路径 | `packages/ui/src/components/data/Empty` |

## 2. 目标与非目标

**目标**：空状态 **居中竖排**；**`image`**（默认 **📭**）+ **`description`**（默认 **`No Data`**）+ 可选 **`children`**；**`simple`** 时 **去边框透明底**；**`imageStyle`** 作用于 **图标容器 `div`**。  
**非目标**：无内置插图 URL、无 **`Button` 预设**。

## 4. DOM

根 **`div`**；**`<p>`** 承载 **`description`**（**非 `role=status`**）。

## 7. API

`description`/`image`/`simple`/`imageStyle`；**`HTMLAttributes<HTMLDivElement>`**。

## 8. Ref

**`HTMLDivElement`**。

## 9. 无障碍

**`description` 在 `p`**；**emoji 默认图** 读屏 **不稳定**；重要场景建议 **`image` 传 SVG + `aria-hidden`** 并 **`aria-label` 根**。

## 14. 风险

**`children` 与主文案** 无 **ARIA 关系**；**`simple` 仍 `p-6`**（仅去边框）。

## 15. 结论

对标 Ant **`Empty`/`simple`** 子集的轻量空态。

## 附录 A

职责·空态 | DOM·div+p | Ref·div | a11y·emoji

## 附录 B

`Empty.tsx`。
