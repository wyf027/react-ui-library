# Image 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/Image/Image.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Image` |
| 路径 | `packages/ui/src/components/data/Image` |

## 2. 目标与非目标

**目标**：**`span.relative.inline-block`** 包 **`img`**；**`placeholder`** 在 **`!loaded`** 时 **绝对居中**；**`onError`→`failed`** 切换 **`imgSrc` 为 `fallback`**；**`preview`**（默认 true）**点击→全屏遮罩** **`z-[9999]`** 大图 **`onClick` 关**。  
**非目标**：无 **渐进模糊**、无 **多图预览**。

## 4. DOM

**`<>`**：**`span` > `img`** + **条件 Fragment 预览层**。

## 5–6

**`useState`**：**`failed`/`loaded`/`previewOpen`**。

## 7. API

**`extends ImgHTMLAttributes`** + **`fallback`/`placeholder`/`preview`**；**`{...props}` 在 `img` 末尾**（**可覆盖 `onClick`** 破坏预览）。

## 8. Ref

**`forwardRef<HTMLImageElement>`** → **`img`**（**非 `span`**）。

## 9. 无障碍

**预览层** **无 Esc**；**`alt` 默认 `''`** 弱。

## 14. 风险

**`className` 在 `span`**，**`img` 另 `className`** 需 **`props`/`img` 级** 处理；**`preview` 与自定义 `onClick`** 冲突见 §7。

## 15. 结论

**占位+错误回退+简易预览** 三合一。

## 附录 A

职责·图片增强 | Ref·img | 风险·props 覆盖 onClick

## 附录 B

`Image.tsx`。
