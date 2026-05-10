# Tabs 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Tabs/Tabs.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Tabs` |
| 路径 | `packages/ui/src/components/navigation/Tabs` |
| 依赖 | `cn`、`useControllableState` |

## 2. 目标与非目标

**目标**：**`role="tablist"`** + **`button role="tab"`** **`aria-selected`**；**`role="tabpanel"`** 展示 **`activeItem.content`**；**`useControllableState<string>`**（**`activeKey`/`defaultActiveKey`/`onChange`**）；**`defaultActiveKey` 缺省为首个非 `disabled` 项 `key`**（**`firstEnabled`**）。  
**非目标**：无 **键盘左右切**、无 **懒加载 panel**、无 **垂直 Tabs**。

## 5–6

**受控/非受控** 与 **`useControllableState`** 一致；**`current` 无匹配项** 时 **panel 空**。

## 7. API

**`TabItem`**：**`key`/`label`/`content`/`disabled?`**；**`TabsProps`**：**`items`** + **`activeKey`/`defaultActiveKey`/`onChange`**；**`Omit<..., 'onChange'>`**。

## 8. Ref

**`HTMLDivElement`** → **外层包裹 `div`**。

## 9. 无障碍

**`tablist`/`tab`/`tabpanel`** 基础具备；**缺 `aria-controls`/`id` 关联**、**缺 roving tabindex**。

## 14. 风险

**`items` 全 `disabled`**：**`firstEnabled` 为 `''`**，**初始 `current` 空字符串** 可能 **无选中**；**`activeKey` 非法** → **无内容**。

## 15. 结论

**轻量页签**，a11y **优于 Segmented**（**有 role**），仍 **弱于 WAI-ARIA Tabs 完整模式**。

## 附录 A

职责·页签切换 | 状态·useControllableState | DOM·tablist/tab/panel

## 附录 B

`Tabs.tsx`；测试 **`Tabs.test.tsx`**。
