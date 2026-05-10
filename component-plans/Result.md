# Result 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/data/Result/Result.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Result` |
| 路径 | `packages/ui/src/components/data/Result` |

## 2. 目标与非目标

**目标**：**`status`**（**success/error/warning/info**）映射 **emoji 大图标**；**`title`→`h3`**、**`subTitle`→`p`**、**`extra`** 底部区；**`Omit<..., 'title'>`**。  
**非目标**：无 **操作按钮预设**、无 **403 插画**。

## 4. DOM

根 **`div`** **居中 `text-center` 卡片**；**`h3`/`p`** 条件渲染。

## 7. API

`status`/`title`/`subTitle`/`extra`；**`HTMLAttributes`** 透传根。

## 8. Ref

**`HTMLDivElement`**。

## 9. 无障碍

**`h3` 有标题语义**；**emoji 图标** **无 `aria-hidden`**，可能与 **`title` 重复朗读**。

## 14. 风险

**仅 emoji**，与 **设计系统插画** 不一致；**`extra` 内按钮** 需 **业务** 提供 **`type="button"`**。

## 15. 结论

**操作结果页** 轻量块，与 **Notification** 卡片态可对比选型。

## 附录 A

职责·结果反馈 | DOM·div+h3 | Ref·div

## 附录 B

`Result.tsx`。
