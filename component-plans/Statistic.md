# Statistic 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度。  
> **基准**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **实现**：`packages/ui/src/components/data/Statistic/Statistic.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Statistic` |
| 路径 | `packages/ui/src/components/data/Statistic` |
| 依赖 | `cn` |

## 2. 目标与非目标

**目标**：卡片式展示 **标题 `title`** + **大号 `value`**，可选 **`prefix`/`suffix`**（与 HTML `title`/`prefix` 冲突已 `Omit`）。  
**非目标**：无动画数字、无 `precision`/`formatter`、无趋势图。

## 3–4. 职责与 DOM

**场景**：指标卡、仪表盘数字。  
**DOM**：根 **`div`** **`rounded-lg border p-4`**；**`title`** 为 **`text-xs`**；**`value` 行** **`flex items-end gap-1`** 内 **`prefix` + `<span>{value}</span>` + `suffix`**。

## 5–6. 状态与数据

无内部 state；**`value` 由父传入**（`string | number`）。

## 7. API

| 属性 | 说明 |
| --- | --- |
| `value` | 必填，`string \| number` |
| `title` / `prefix` / `suffix` | `ReactNode` |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'title' \| 'prefix'>` |

## 8. Ref

**`forwardRef<HTMLDivElement>`** → 根 `div`。

## 9. 无障碍

**无** `role="region"`/`aria-labelledby`；**`title` 非标题语义**（仅为小号文案 div）。

## 10. 样式

**`dark:`** 边框与背景已覆盖。

## 11–12. 组合与测试

透传 **`{...props}`** 在根。建议补测：**`prefix`/`suffix` 渲染**。

## 14. 风险

**`title` 与页面 `<h1>` 层级无关**；若需标题语义应 **在 `title` 内自嵌 `span`/`strong`** 或演进 **`headingLevel`**。

## 15. 结论

轻量 **指标展示块**，与 **Button** 无继承关系。

## 附录 A（九维简表）

职责·展示数值 | DOM·div+flex | 状态·无 | API·value/title/prefix/suffix | Ref·div | a11y·弱 | 样式·border 卡

## 附录 B

见 `Statistic.tsx` 全文件（约 25 行）。
