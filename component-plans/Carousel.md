# Carousel 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/Carousel/Carousel.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Carousel` |
| 路径 | `packages/ui/src/components/data/Carousel` |

## 2. 目标与非目标

**目标**：**`items: ReactNode[]`** **横向 `flex`**，**`transform: translateX(-current*100%)`**；**`autoplay`+`autoplaySpeed`** **`setInterval(goTo(current+1))`**；**`dots`/`arrows`**；**`goTo` 模运算**。  
**非目标**：无 **触摸滑动**、无 **`beforeChange`**；**`items.map` `key={i}`**。

## 5–6

**`useState(0)`** **`current`**；**非受控**。

## 7. API

**`items`**；**`autoplay`** 默认 false；**`autoplaySpeed`** 3000；**`dots`/`arrows`** 默认 true。

## 8. Ref

**`HTMLDivElement`**。

## 9. 无障碍

**点按钮 `aria-label`** ✓；**无 `role="region"`/`aria-live`**；**幻灯片无 `aria-hidden`** 于非当前项。

## 14. 风险

**`items.length===0`**：**`count=0`** **`goTo`** **模 0 → NaN** 风险（**`useEffect` autoplay** `count<=1` return，但 **手动** 若扩展需注意）；**`key={i}`** **重排问题**。

## 15. 结论

**基础轮播**，适合 **少量静态 slide**。

## 附录 A

职责·轮播 | 状态·current | 风险·空 items/key

## 附录 B

`Carousel.tsx`。
