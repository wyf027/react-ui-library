# TreeSelect 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/form/TreeSelect/TreeSelect.tsx`（依赖 **`navigation/Tree`**）

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `TreeSelect` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/form/TreeSelect` |
| 分类 | Form |
| 依赖 | **`Tree`**、`useControllableState`、`cn` |
| 关联组件 | **`Cascader`**（路径数组）、**`Select`**（扁平）、**`Form`/`FormItem`** |

---

## 2. 目标与非目标

### 2.1 目标（与当前实现对齐）

1. **树形单选**：**`value` 为单个 `string`（节点 `key`）**，**`useControllableState`** 受控/非受控。  
2. **展示选中标题**：只读框内 **`findTitle(data, current)`**，失败则回退显示 **`current`（key）**；空为 **「请选择节点」**（固定中文）。  
3. **内嵌 `Tree`**：传入 **`data`**，**`expandedKeys={keys}`** 其中 **`keys = collectKeys(data)`**（**全树 key 扁平**）。  
4. **点击选节点**：在 **`Tree` 根容器 `onClick`** 上委托：找 **`closest('button')`**，用 **`textContent`** 与 **`keys.find(k => text?.includes(k))`** 推断被选 **key**，再 **`setCurrent(matched)`**。  
5. **类型**：**`TreeNode`** 与 **`Tree`** 一致（**`key: string`**，**`title: ReactNode`**）。

### 2.2 非目标

1. **多选、checkbox、半选**：当前 **单选**。  
2. **稳定、可维护的节点命中方式**（`data-key`、受控 `Tree` API）：当前 **依赖 `button` 文案包含 `key`**，见 §14。  
3. **搜索、异步加载、虚拟滚动**：未实现。  
4. **`Tree` 展开/折叠与 `TreeSelect` 解耦**：当前 **`expandedKeys` 恒为全 key**，**`Tree` 内展开按钮在受控且无 `onExpand` 时无法更新父值**（见 §5.2、§14）。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 组织/类目单选 | **`data` 为树**，**`value` 为选中节点 `key`**。 |
| 表单 | **`onChange(value: string)`** 写 **`FormValues`**；与 **`FormItem`** 组合需 **包装**（同 **`Select`**）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根 | **`<div ref={ref} className="space-y-2">`** |
| 展示条 | **`<div>`** 边框块，**非 `input`**，**不可键盘展开**（无 **`combobox`** 语义） |
| 树 | **`<Tree data={...} expandedKeys={keys} onClick={...} />`**（**`onClick` 落在 `Tree` 根 `div`**，见 `Tree` 实现） |

---

## 5. 状态与交互

### 5.1 选中值

- **`useControllableState<string>({ value, defaultValue, onChange })`** → **`current`**。  
- **`defaultValue`** 默认 **`''`**。

### 5.2 `Tree` 的 `expandedKeys`

- **`keys = collectKeys(data)`**（先序扁平：**父 key + 子树 keys**）。  
- **`expandedKeys={keys}`** → **`Tree`** 视为**受控展开列表且恒为全集**，且 **`TreeSelect` 未传 `onExpand`**。  
- 结果：**整树在展示上处于「全展开」路径**；**`Tree` 节点按钮的折叠逻辑依赖 `onExpand` 回写父级 `expandedKeys`**，此处**无回写**，**展开/折叠按钮点击可能无效**（**`Tree` 内部 `setCurrent` 仅调 `onExpand`，为 `undefined`**）。**实际依赖初始即全 `expandedKeys` 使节点均 `expanded`**。

### 5.3 选中交互（`Tree` 根 `onClick`）

1. **`event.target`** 转 **`HTMLElement`**，**`closest('button')`**。  
2. **`text = btn.textContent?.trim()`**。  
3. **`matched = keys.find((k) => text?.includes(k))`**。  
4. 若 **`matched`**，**`setCurrent(matched)`**。

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 值 | **单 string key** |
| 回调 | **`onChange?: (value: string) => void`** |
| 标题解析 | **`findTitle` DFS**；**`title` 为 `ReactNode`** 时用 **`String(node.title)`**（对象类可能为 **`[object Object]`**） |

---

## 7. API 规范

### 7.1 `TreeSelectProps`

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `data` | 树数据 | `TreeNode[]` | **必填** | 与 **`Tree`** 同源类型 |
| `value` | 受控选中 key | `string` | - | `undefined` 非受控 |
| `defaultValue` | 非受控初值 | `string` | `''` | |
| `onChange` | 选中变化 | `(value: string) => void` | - | |
| `className` | 根 `div` | `string` | - | |
| 继承 | `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` | - | - | |

### 7.2 工具函数（模块内）

| 函数 | 作用 |
| --- | --- |
| `findTitle(nodes, key)` | DFS 找 **`title`**（**`String(title)`**） |
| `collectKeys(nodes)` | 先序收集 **`key[]`** |

### 7.3 建议演进（可选）

| 能力 | 优先级 |
| --- | --- |
| **`Tree` 增加 `onSelectNode` / `data-node-key`** | P0 |
| **弹层 + `combobox` + 键盘** | P1 |
| **多选、`showSearch`、`loadData`** | P2 |
| **`expandedKeys` 可控 + `onExpand` 透传** | P1 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| Ref | **`forwardRef<HTMLDivElement, TreeSelectProps>`** → **外层包裹 `div`** |
| **`Tree` ref** | **未**从 **`TreeSelect`** 转发 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 展示条 | **非原生输入**；**无 `role="combobox"`**；键盘用户难以发现树关联。 |
| 树 | **`Tree`** 内 **`button`** 有 **`nova-focus-ring`**；**选中依赖点击冒泡推断**，**无 `aria-selected`**。 |
| 占位 | **「请选择节点」** 固定中文。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 展示条 | `rounded-md border ... px-3 py-2 text-sm` |
| 间距 | **`space-y-2`** 分隔展示条与 **`Tree`** |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`FormItem`** | **`onChange(string)`** 与 **`cloneElement` 事件** 不兼容时需 **薄包装**。 |
| **`Tree` 升级** | **`TreeSelect` 命中逻辑应同步改为稳定 API**（§7.3）。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 受控 | 父 **`value`** 与展示条、选中逻辑一致。 |
| `onChange` | 点击叶/父（若文案含唯一 key）触发。 |
| `findTitle` | **`title` 为 string** 时展示正确。 |
| Ref | **`HTMLDivElement`**。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 简单树、**`key` 勿互相子串包含**、与 **`FormItem`** 包装。 |
| 必须声明 | **§14 命中算法风险**、**全量 `expandedKeys`**、**折叠可能无效**。 |

---

## 14. 风险与开放问题（重要）

| 风险 | 说明 |
| --- | --- |
| **`keys.find(k => text?.includes(k))`** | **`textContent` 含多个 key 子串时**，**先匹配 `collectKeys` 顺序靠前者**，**可能误选**；**`key` 与标题文案无稳定 DOM 绑定**。 |
| **`String(ReactNode title)`** | **非 string title** 展示/匹配异常。 |
| **`expandedKeys` 写死全 key + 无 `onExpand`** | **`Tree` 折叠交互不可靠**；依赖全展开展示整树。 |
| **与 `Tree` 内层 `button` 冲突** | 点击展开箭头与点击选中有事件竞争；当前 **同一 `onClick` 委托** 依赖 **文案解析**。 |

---

## 15. 结论

`TreeSelect` 当前为 **「展示条 + 内嵌全展开 `Tree` + 文案猜 key」** 的**极简原型**：能跑通 **简单树 + string title + 安全 key 命名**；**生产级**需 **P0：稳定节点选择 API（`data-key` / `onSelect`）** 并理顺 **`expandedKeys` 与 `Tree` 受控**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | TreeSelect 结论 |
| --- | --- |
| 职责 | 树中单 key 选择 |
| DOM/语义 | div + 展示块 + Tree |
| 状态与交互 | useControllableState、委托点击猜 key |
| 数据与受控 | value string、data 树 |
| API | data、value、defaultValue、onChange、omit div onChange |
| 类型与 Ref | HTMLDivElement |
| 无障碍 | 弱；非 combobox |
| 样式与主题 | border、space-y |
| 文档与验证 | §14 风险、FormItem |

---

## 附录 B：`collectKeys` 顺序

**`flatMap((node) => [node.key, ...collectKeys(children)])`** → **先序**：父在子前，影响 **`includes` 匹配优先级**。

---

## 附录 C：参考实现片段（当前仓库）

文件：`packages/ui/src/components/form/TreeSelect/TreeSelect.tsx`。

要点：**`expandedKeys={keys}`**、**`onClick` + `closest('button')` + `text.includes(k)`**。

（以仓库实际代码为准。）
