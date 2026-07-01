# Menu 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Menu/Menu.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Menu` |
| 路径 | `packages/ui/src/components/navigation/Menu` |

## 2. 目标与非目标

**目标**：**`<ul role="menu">`**，**`li role="none"`** + **`button role="menuitem"`**；**`mode`** **`vertical`（默认）/ `horizontal`**；**`selectedKey`** **高亮**；**`onChange?.(key)`**。  
**非目标**：无 **子菜单**、无 **受控 `open`**、无 **键盘方向键**。

## 5–6

**纯展示选中态**；**`selectedKey` 全由父更新**（**非 `useControllableState`**）。

## 7. API

**`MenuItem`**：**`key`/`label`/`disabled?`**；**`MenuProps`**：**`items`/`selectedKey?`/`onChange?`/`mode?`**；**`Omit<HTMLAttributes<HTMLUListElement>, 'onChange'>`**。

## 8. Ref

**`HTMLUListElement`** → **`ul`**。

## 9. 无障碍

**`menu`/`menuitem`** ✓；**无 `aria-expanded`**（无子菜单正常）。

## 14. 风险

**仅点击**；**`horizontal` 时 `flex gap`** **无响应式换行策略** 文档说明。

## 15. 结论

**一级菜单** MVP，与 **`Dropdown` role=menu** 结构类似但 **场景不同**。

## 附录 B

`Menu.tsx`。
