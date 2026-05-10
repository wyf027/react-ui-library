# ImagePreview 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/ImagePreview/ImagePreview.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `ImagePreview` |
| 路径 | `packages/ui/src/components/data/ImagePreview` |

## 2. 目标与非目标

**目标**：**缩略 `img`** **`onClick`→`open`**；**全屏遮罩** **`fixed z-50`** **`onClick` 关闭**；大图 **`max-h-[90vh] max-w-[90vw]`**。  
**非目标**：无 **键盘 Esc**、无 **焦点陷阱**、无 **多图切换**；**根 `ref` 在包裹 `div`，非遮罩**。

## 4. DOM

**`<>` Fragment**：**外层 `div.inline-flex`（`ref`+`props`）** 内 **`img`**；**`open` 时** 兄弟 **遮罩 `div`**（**无 Portal**，仍在树中）。

## 5–6

**`useState(false)`** 管 **`open`**；**非受控**。

## 7. API

**`src`** 必填；**`alt`** 默认 **`preview`**；**`width`/`height`** 默认 **160×120**；**`HTMLAttributes`** 落 **外层 `div`**（**不落在缩略 `img`**，除解构外）。

## 8. Ref

**`HTMLDivElement`** → **外层 `div`**；**遮罩无 ref**。

## 9. 无障碍

**无 `role="dialog"`**；**Esc 关闭** 无；**大图点击关** 可接受。

## 14. 风险

**`Fragment` 双节点**：**`ref` 无法** 同时指 **遮罩**；**缩略图 `props` 不合并到 `img`**（**`img` 无 `{...imgProps}`** 除 **未解构字段**—实际 **仅** `src/alt/width/height/onClick/className` 固定）。

## 15. 结论

**轻量点击放大**，与 **`Image` 内置 preview** 可对比选型。

## 附录 A

职责·缩略+灯箱 | 状态·open | 风险·无 Esc/Portal

## 附录 B

`ImagePreview.tsx`。
