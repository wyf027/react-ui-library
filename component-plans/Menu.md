# Menu 组件技术方案

> 与 **Button 技术方案**同维度。  
> **实现**：`packages/ui/src/components/navigation/Menu/Menu.tsx`、`Menu.test.tsx`

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Menu` |
| 路径 | `packages/ui/src/components/navigation/Menu` |

## 2. 目标与非目标

**目标**：

1. **语义**：**`mode="horizontal"`** → 根 **`role="menubar"`**；**`vertical`** → **`role="menu"`**。子列表 **`role="menu"`**，**`aria-labelledby`** 指向父 **`menuitem`**。
2. **一级 + 嵌套**：**`MenuItem.children`**（仅 **`vertical`**）；父 **`aria-haspopup="menu"`**、**`aria-expanded`**、**`aria-controls`**。
3. **选中**：叶子 **`aria-current="page"`**（与 **`selectedKey`**）；**`onChange(key)`** 仅叶子。
4. **展开**：**`openKeys`/`defaultOpenKeys`/`onOpenChange`**（受控或非受控）。
5. **键盘**：纵向 **↑↓** 漫游、**Home/End**、**→** 展开并聚焦首子、**←**/**Esc** 收起子菜单；横向 **←→**、**Home/End**。
6. **横向**：**`stripChildren`** — **`children` 不参与渲染**（避免 menubar 下不合规模型）。

**非目标**：侧栏 **折叠宽度动画**、**多选 `selectedKeys`**、**图标 slot / itemRender**（业务自行 **`label` 塞 ReactNode**）。

## 4. DOM（摘要）

根 **`ul`** → **`li role="none"`** → **`button role="menuitem"`**；子菜单 **`ul role="menu"`** 嵌于 **`li`**。

## 7. API（摘要）

**`MenuItem`**：**`key`/`label`/`disabled?`/`children?`**  

**`MenuProps`**：**`items`/`selectedKey?`/`onChange?`/`mode?`/`openKeys?`/`defaultOpenKeys?`/`onOpenChange?`**；**`Omit<HTMLAttributes<HTMLUListElement>, 'onChange'>`**。

## 8. Ref

**`HTMLUListElement`** → **根 `ul`**。

## 9. 无障碍

**menubar/menu**、**`aria-expanded`**、**roving `tabIndex`**（单 **`tabIndex={0}`**）、键盘见 §2。

## 14. 风险

受控 **`openKeys`** 下必须通过 **`onOpenChange`** 回写，否则展开状态不更新；横向 **`flex-wrap`** 换行策略文档说明。

## 15. 结论

纵向导航菜单 + 可选一层嵌套子菜单与 SPEC §6.2 对齐；横向顶栏为 **扁平 menubar**。

## 附录 B

`Menu.tsx`（**`flattenVisible`**、**`handleKeyDown`**、**`renderBranch`**）。
