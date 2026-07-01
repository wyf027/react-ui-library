# Tree 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/navigation/Tree/Tree.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Tree` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/navigation/Tree` |
| 分类 | Navigation |
| 依赖 | `cn`、`useControllableState` |
| 关联组件 | **`TreeSelect`**（内嵌本组件并委托点击选中，见 [TreeSelect.md](./TreeSelect.md)） |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **展示树形数据**：根为 **`data: TreeNode[]`**，递归渲染 **节点行 + 可选子树**。  
2. **展开/折叠**：有 **`children.length > 0`** 的节点，行首 **`▾`/`▸`** 指示状态；点击行 **`button`** 在 **`expandedKeys`** 集合中 **toggle 当前节点 `key`**。  
3. **受控/非受控展开**：**`useControllableState<string[]>`**，支持 **`expandedKeys` / `defaultExpandedKeys` / `onExpand(keys)`**。  
4. **缩进**：行内 **`style.paddingLeft = depth * 16 + 8`（px）** 体现层级。  
5. **根容器**：**`div`** + 圆角边框卡片样式；**`data-tree-keys={allKeys.length}`**（**`allKeys` 为整树先序扁平的全部 `key`**，属性值为 **key 个数**）。

### 2.2 非目标

1. **`role="tree"` / `treeitem` / `group`、 `aria-level` / `aria-setsize` / `aria-posinset`** 等 **WAI-ARIA Tree** 模式：当前 **未实现**。  
2. **多选、勾选框、拖拽排序、连线、搜索、异步懒加载、虚拟列表**：当前 **未实现**。  
3. **键盘方向键漫游 / roving tabindex**：当前 **未实现**。  
4. **节点级 `disabled`、自定义图标插槽、编辑重命名**：类型 **`TreeNode`** 未承载。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 侧栏/设置里的 **层级目录** | 只读或配合父级逻辑，用 **`expandedKeys`** 控制可见子树。 |
| **`TreeSelect` 下拉体** | 作为 **数据与展开** 的展示层；选中逻辑目前在 **`TreeSelect`**（见关联方案 §5）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} ... data-tree-keys={...}>`**，继承 **`HTMLAttributes<HTMLDivElement>`**（除业务 props 外 **`...props` 透传**）。 |
| 节点行 | **每项外层 `<div key={node.key}>`**；行内 **`<button type="button">`**（**整行可点**，无子节点时 **`onClick` 直接 return**）。 |
| 子树 | **有子且 `expanded`** 时 **`node.children.map(child => renderNode(child, depth + 1))`**，否则 **不渲染子 DOM**。 |
| 语义 | **非 `<ul>/<li>`**；**非 `role="tree"`**；与 **标准树控件** 读屏模型 **不对齐**。 |

---

## 5. 状态与交互

### 5.1 展开集合

- **`useControllableState<string[]>({ value: expandedKeys, defaultValue: defaultExpandedKeys, onChange: onExpand })`** → **`current`**。  
- **`defaultExpandedKeys`** 默认 **`[]`**。  
- **点击带子节点行**：**`expanded`** 为真则 **`current.filter(k => k !== node.key)`**，否则 **`[...current, node.key]`**。

### 5.2 叶子节点

- **`hasChildren === false`**：**`button` 仍存在**，前缀 **`•`**，**点击无状态变化**（早退）。

### 5.3 与 `TreeSelect` 组合时的受控展开

- 若父传入 **`expandedKeys`（受控）** 且 **不传 `onExpand`**，**内部 `setCurrent` 仍会调用**，但 **`useControllableState`** 在无 **`onChange`** 时 **无法把新展开集写回父级** → **折叠/展开按钮可能无效**（与 [TreeSelect.md](./TreeSelect.md) §5.2 一致）。**缓解**：父级同时提供 **`onExpand`** 或 **非受控 `defaultExpandedKeys`**。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 节点类型 | **`TreeNode`**：**`key: string`**、**`title: ReactNode`**、**`children?: TreeNode[]`**。 |
| 展开状态 | **`string[]`**，元素为 **已展开节点的 `key`**（**非**「仅叶子」或路径）。 |
| 扁平辅助 | **`flattenKeys(nodes)`**：**`flatMap`** 先序收集 **`[node.key, ...子树 keys]`**，用于 **`allKeys`**（见 §2.1 注：**`data-tree-keys` 存的是 `allKeys.length`**）。 |

---

## 7. API 规范

### 7.1 `TreeProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `data` | 树根列表 | `TreeNode[]` | **必填** | |
| `expandedKeys` | 受控展开 key 列表 | `string[]` | - | 与 **`onExpand`** 配对受控 |
| `defaultExpandedKeys` | 非受控初值 | `string[]` | `[]` | |
| `onExpand` | 展开集变化 | `(keys: string[]) => void` | - | 透传为 **`useControllableState` `onChange`** |
| `className` | 根容器 | `string` | - | 与 **`cn`** 合并 |
| 继承 | `HTMLAttributes<HTMLDivElement>` | - | - | **`...props`** 落在根 **`div`** |

### 7.2 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`data-node-key` / `onNodeClick` / `selectedKeys`** | P0（便于 **`TreeSelect`** 与测试，避免文案猜 key） |
| **`role="tree"` + `aria-expanded` + `aria-level` + 键盘** | P1 |
| **`showLine`、`icon`、`loadData`、虚拟滚动** | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 导出 | **`TreeNode`**、**`TreeProps`**。 |
| Ref | **`forwardRef<HTMLDivElement, TreeProps>`**，指向 **根 `div`**。 |

---

## 9. 无障碍（a11y）

| 项 | 当前 | 建议演进 |
| --- | --- | --- |
| 展开/折叠 | 仅用 **字符 `▾`/`▸`/`•`** 区分 | **`aria-expanded={hasChildren ? expanded : undefined}`**；子区域 **`id` + `aria-controls`** |
| 树结构 | 无 **`role="tree"`** | 按 **APG Tree** 补 **`treeitem` / `group`** 与 **层级 `aria-level`** |
| 根 | 无 **`aria-label`** | 由业务传入 **`aria-label`** / **`aria-labelledby`**（已通过 **`...props`** 支持） |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 根 | **`rounded-lg border border-slate-200 bg-white p-2`**，暗色 **`dark:border-slate-700 dark:bg-slate-900`**。 |
| 行按钮 | **`nova-focus-ring`**、**`hover:bg-slate-100`**、暗色 **`dark:hover:bg-slate-800`**、**`text-sm`**。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`TreeSelect`** | **`data`/`TreeNode` 类型一致**；若 **全量受控 `expandedKeys`**，须 **`onExpand`** 或接受 **折叠无效**。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 非受控 | **`defaultExpandedKeys`** 子树初始可见；点击父节点 **toggle**。 |
| 受控 | **`expandedKeys` + `onExpand`** 同步更新。 |
| 叶子 | 有 **`children` 空数组** 与 **无 `children`** 均视为无子；点击 **不改变** `expandedKeys`。 |
| Ref | **`ref`** 指向根 **`HTMLDivElement`**。 |
| 重复 `key` | 文档/测试约定 **全局唯一**（React **`key`** 与 **`includes` 逻辑**）。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | **非受控默认展开**、**受控 `expandedKeys`**、**深一点的 `data`**。 |
| 说明 | **`onExpand` 与受控关系**；**`data-tree-keys` 为 key 数量**；与 **`TreeSelect`** 的差异（选中不在本组件）。 |

---

## 14. 风险与开放问题

| 风险 | 说明 / 缓解 |
| --- | --- |
| **受控无 `onExpand`** | 展开状态 **无法持久化到父级**，见 §5.3；文档与 **`TreeSelect`** 方案已标注。 |
| **`setCurrent` 使用闭包 `current`** | 极快连续点击 **理论上** 可能 **丢更新**；演进可用 **函数式 `setCurrent(prev => ...)`**。 |
| **`key` 重复** | **展开/折叠** 与 **React diff** 行为未定义；**数据侧保证唯一**。 |
| **`title` 为复杂 `ReactNode`** | 行文本 **无独立 `data-key`**，**`TreeSelect` 用 `textContent.includes(key)`** 脆弱（见 **TreeSelect** §14）。 |

---

## 15. 结论

`Tree` 定位为 **轻量、样式化的层级展开列表**：**`TreeNode` + 展开集合受控/非受控**，**DOM 为 `div` + `button` 行**，**尚未对齐 WAI-ARIA Tree 与键盘模型**。**与 `TreeSelect` 联用时须特别注意 `expandedKeys`/`onExpand` 的受控配对**；长期演进建议 **`data-node-key`、选中/聚焦 API、APG 树模式**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Tree 结论 |
| --- | --- |
| 职责 | 树数据展示、展开/折叠 |
| DOM/语义 | 根 `div`、行 `button`、无 `tree` role |
| 状态与交互 | `expandedKeys` 集合 toggle；叶子无操作 |
| 数据与受控 | `useControllableState<string[]>` |
| API | `data`、`expandedKeys`、`defaultExpandedKeys`、`onExpand` |
| 类型与 Ref | `TreeNode`、`TreeProps`、`HTMLDivElement` |
| 无障碍 | 待补 `aria-expanded`、树 role、键盘 |
| 样式与主题 | 卡片容器 + 行 hover + `nova-focus-ring` |
| 文档与验证 | 强调受控 `onExpand`、`TreeSelect` 组合 |

---

## 附录 B：当前源码路径

- `packages/ui/src/components/navigation/Tree/Tree.tsx`
- `packages/ui/src/components/navigation/Tree/index.ts`
