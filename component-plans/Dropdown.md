# Dropdown 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Dropdown/Dropdown.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Dropdown` |
| 路径 | `packages/ui/src/components/navigation/Dropdown` |

## 2. 目标与非目标

**目标**：**`trigger` 外包 `button`** **切换 `open`**；**`ul role="menu"`** **`absolute right-0 top-full`**；选项 **`onClick` → `onChange(key)` + `setOpen(false)`**。  
**`open`/`defaultOpen`/`onOpen`/`onClose`**：**`setOpen`** 在 **非受控** 时 **`setInnerOpen`**；**`onOpen`/`onClose`** 随 **`next` 布尔** 调用（**与 Popconfirm 类似**：受控时 **父须同步 `open`**）。  
**非目标**：无 **click-outside**、无 **Esc**、无 **Portal**。

## 5–6

**`useState`+`controlledOpen ?? innerOpen`**。

## 7. API

**`DropdownOption`**；**`trigger`/`options`/`onChange`/`open`/`defaultOpen`/`onOpen`/`onClose`**；**`Omit<..., 'onChange'>`**。

## 8. Ref

**`HTMLDivElement`** → **外层 `div`**。

## 14. 风险

**受控不同步**、**无外部关闭**（**只能再点 trigger 或选项**）；**`trigger` 内勿嵌套 `button`**。

## 15. 结论

**右下菜单** 变体，与 **`Popover`** 选型：**`Dropdown` 偏命令列表**。

## 附录 B

`Dropdown.tsx`；**`Dropdown.test.tsx`**。
