---
title: Menu 菜单
---

# Menu 菜单

侧栏或顶栏导航：**纵向**为 **`role="menu"`**，**横向**为 **`role="menubar"`**；支持一级 **`items`**、可选 **嵌套子菜单**（仅 **`mode="vertical"`** 生效）。键盘：**方向键**漫游、**Home** / **End**、子菜单 **Esc** / **ArrowLeft** 收起。

## 示例

<code src="./demos/menu-vertical.tsx"></code>

### 横向（menubar）

<code src="./demos/menu-horizontal.tsx"></code>

## API

### MenuProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单树；项可含 **`children`** 作为子菜单（仅纵向） | `MenuItem[]` | - |
| mode | **`horizontal`** → **`role="menubar"`**（子项 **`children` 会被忽略**）；**`vertical`** → **`role="menu"`** | `'vertical' \| 'horizontal'` | `'vertical'` |
| selectedKey | 当前选中叶子项 **`key`**（**`aria-current="page"`**） | `string` | - |
| onChange | 点击**叶子**（无 `children`）时触发 | `(key: string) => void` | - |
| openKeys | 受控：展开中的父级 **`key`** | `string[]` | - |
| defaultOpenKeys | 非受控初始展开 | `string[]` | `[]` |
| onOpenChange | 展开集合变化 | `(keys: string[]) => void` | - |
| className | 根 **`ul`** | `string` | - |

其余合法的 **`HTMLAttributes<HTMLUListElement>`**（除 **`onChange`**）落在根 **`ul`**；**`ref`** 指向根 **`ul`**。

### MenuItem

| 字段 | 说明 |
| --- | --- |
| key | 唯一标识 |
| label | 展示文案 |
| disabled | 禁用后不可聚焦导航序号 |
| children | 子菜单项（仅 **`vertical`**） |

### 键盘（概要）

| 模式 | 键 |
| --- | --- |
| vertical | **↑/↓**：上一项 / 下一项；**→**：展开并聚焦首个子项；**←**：收起当前子菜单并聚焦父级；**Home** / **End**；**Esc**：从子项收起父菜单，或收起已展开的当前父项 |
| horizontal | **←/→**：上一项 / 下一项；**Home** / **End** |
