# Steps 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Steps/Steps.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Steps` |
| 路径 | `packages/ui/src/components/navigation/Steps` |

## 2. 目标与非目标

**目标**：**`<ol className="flex">`** 横向步骤；**`current`**（默认 **0**）决定 **已完成（`index < current`）/ 当前（`index === current`）/ 未完成**；**圆圈内数字 `index+1`**；**项间绝对定位横线** **`w-[calc(100%-2.5rem)]`**。  
**非目标**：无 **受控 `onChange`**、无 **可点击跳转**、无 **`status` error**。

## 5–6

**无 state**；**`current` 父传**。

## 7. API

**`StepItem`**：**`key`/`title`/`description?`**；**`items`/`current?`**；**`HTMLAttributes<HTMLOListElement>`**。

## 8. Ref

**`HTMLOListElement`** → **`ol`**。

## 9. 无障碍

**`ol` 无 `aria-label`**；**步骤未标 `aria-current="step"`** 演进建议。

## 14. 风险

**`current` 越界**（**`<0` 或 `>=items.length`**）**视觉仍渲染** 但语义怪；**横线 `absolute`** 依赖 **`flex-1`** 布局。

## 15. 结论

**只读步骤条**，适合 **静态流程展示**。

## 附录 B

`Steps.tsx`。
