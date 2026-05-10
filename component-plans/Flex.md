# Flex 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Flex/Flex.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Flex` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Flex` |
| 分类 | Layout |
| 依赖 | `cn`；内联 `style.gap`（可选） |
| 关联组件 | **`Row`**（横向+预设 gap 二元组）、**`Space`**（一维间距+split）、**`Container`** |

---

## 2. 目标与非目标

### 2.1 目标

1. **通用 Flex 容器**：暴露 **`direction`**、**`align`**、**`justify`**、**`wrap`**，覆盖常见主轴/交叉轴布局。  
2. **快捷纵向**：**`vertical`** 为 `true` 且未显式传 **`direction`** 时，等价 **`direction="column"`**。  
3. **行内 Flex**：**`inline`** 为 `true` 时使用 **`inline-flex`**（对标 Ant `Flex` 行内场景）。  
4. **间距**：**`gap`** 支持 **`number`（px）** 或 **`string`**（任意合法 CSS `gap` 值，如 `1rem`、`8px 16px`）。  
5. **样式合并**：内联 **`gap`** 与用户 **`style`** 合并，**`style` 在后** 可覆盖 `gap`。

### 2.2 非目标

1. **子项栅格比例**：不等分宽由子项 `flex`/`width` 控制，不由 `Flex` 内置 `Col`。  
2. **与 `Space` 完全重复**：`Space` 侧重预设 **`size`**、**`split`**、**`direction` 仅横/竖**；`Flex` 侧重 **reverse**、**justify**、**inline**、**gap 字符串**。  
3. **二维网格**：用 **`Grid`** / **`SplitPane`**。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 两端对齐工具栏 | `justify="between"`，`align="center"`。 |
| 垂直表单栈 | `vertical` 或 `direction="column"`，`gap={16}`。 |
| 行内对齐图标+文字 | `inline` + `align="center"` + `gap={8}`。 |
| 反向排列 | `direction="row-reverse"`（注意 a11y，见 §9）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`div`** + `flex` 或 **`inline-flex`**。 |
| 方向类 | `flex-row` / `flex-col` / `flex-row-reverse` / `flex-col-reverse` 由 **`direction`**（或 **`vertical`** 推导）决定。 |
| 语义 | 纯布局容器；列表/导航语义由子树承担。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**。 |
| `direction` 与 `vertical` | **`direction` 优先**：`const dir = direction ?? (vertical ? 'column' : 'row')`；同时传入时以 **`direction`** 为准。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**。 |
| `style` | `style={{ gap: ..., ...style }}`，用户可覆盖 **`gap`**。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `direction` | 主轴方向 | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | 见 §7.2 | 显式传入时覆盖 `vertical` 推导 |
| `vertical` | 快捷纵向 | `boolean` | `false` | 仅当 **`direction` 为 `undefined`** 时等价 `column` |
| `align` | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | - | 可选；有值才加 `items-*` 类 |
| `justify` | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - | 可选；有值才加 `justify-*` 类 |
| `wrap` | 是否换行 | `boolean` | `false` | 为 `true` 时加 `flex-wrap`；默认不换行（与 `Row`/`Space` 默认不同） |
| `gap` | 槽间距 | `number \| string` | - | `number` → `` `${gap}px` ``；`string` 原样作为 CSS `gap` |
| `inline` | 是否行内 flex | `boolean` | `false` | `inline-flex` vs `flex` |
| `className` | 类名扩展 | `string` | - | |
| `style` | 内联样式 | `CSSProperties` | - | 与 `gap` 合并于后 |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | `children` 等 |

### 7.2 `direction` 缺省行为

| `direction` | `vertical` | 实际 `dir` |
| --- | --- | --- |
| `undefined` | `false` | `row` |
| `undefined` | `true` | `column` |
| `'row-reverse'` | `true` / `false` | **`row-reverse`**（`vertical` 被忽略） |

### 7.3 `align` / `justify` 与类映射（当前实现）

**`align` → `items-*`：**

| 值 | 类名 |
| --- | --- |
| `start` | `items-start` |
| `center` | `items-center` |
| `end` | `items-end` |
| `stretch` | `items-stretch` |
| `baseline` | `items-baseline` |

**`justify` → `justify-*`：**

| 值 | 类名 |
| --- | --- |
| `start` | `justify-start` |
| `center` | `justify-center` |
| `end` | `justify-end` |
| `between` | `justify-between` |
| `around` | `justify-around` |
| `evenly` | `justify-evenly` |

### 7.4 `gap` 内联规则

- **`gap === undefined`**：`style` 中 **`gap` 键为 `undefined`**（仅展开 `...style` 时由合并结果决定；当前为 `gap: undefined` 与后续 `style` 合并，最终若用户未传 gap 可能被 React 省略或覆盖）。  
- **`typeof gap === 'number'`**：`` gap: `${gap}px` ``。  
- **`string`**：直接作为 CSS **`gap`** 值（可写 **`8px 16px`** 等）。

### 7.5 与 `Row` / `Space` 选型对照

| 需求 | 更优组件 |
| --- | --- |
| 仅横向一行 + 数字 gutter + 默认换行 | **`Row`**（`wrap` 默认 `true`，`gap` 二元组语义与 Ant 对齐） |
| 预设 small/middle/large、split、纵向栈 | **`Space`** |
| `row-reverse` / `justify-*` / `inline-flex` / gap 字符串 | **`Flex`** |

### 7.6 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| 默认 `wrap` 与 Row 对齐文档 | 说明为何 Flex 默认 `false` | P3 |
| `flex-1` 子项快捷 | 子布局模式 | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `FlexProps extends HTMLAttributes<HTMLDivElement>`。 |
| Ref | `forwardRef<HTMLDivElement, FlexProps>`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| `row-reverse` / `column-reverse` | 视觉顺序与 DOM 顺序可能不一致，**读屏顺序仍以 DOM 为准**；关键操作路径避免仅靠 reverse 颠倒逻辑顺序。 |
| 焦点 | 不改变 tab 顺序；子项可聚焦控件顺序不变。 |
| `inline-flex` | 用于行内对齐时，注意下一行基线与换行，避免可点击区域过小。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 子项收缩 | 未默认加 **`min-w-0`**（与 `Row`/`Col` 不同）；子项内表格溢出时由子项自行 **`min-w-0`** 或 **`overflow`**。 |
| 主题 | `gap` 字符串可接 CSS 变量。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Flex` + `Button` | 工具栏多按钮 `justify` + `gap`。 |
| `Container` → `Flex` | 页头左右分区。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | `flex`、`flex-row`、无 `flex-wrap`（nowrap）。 |
| `vertical` | `flex-col`，无 `direction`。 |
| `direction` 覆盖 | `direction="row"` + `vertical` → `row`。 |
| `inline` | `inline-flex`。 |
| `gap` 数字 | `style.gap` 为 `12px`。 |
| `gap` 字符串 | 原样。 |
| `align`/`justify` | 仅在有值时存在对应类。 |
| `style` 覆盖 | 用户 `style.gap` 覆盖内联。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 横/纵、`inline`、两端对齐、`gap` 数字与字符串、`direction` 与 `vertical` 优先级。 |
| 对照表 | 与 `Row`、`Space` 选型（§7.5）。 |
| 反模式 | 应用 `row-reverse` 隐藏关键信息顺序。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 与 `Row` 默认 `wrap` 不一致 | 文档表格说明；需要换行显式 `wrap`。 |
| 子项无 `min-w-0` 撑破 | 文档提示大表场景在子级处理。 |

---

## 15. 结论

`Flex` 定位为 **通用 Flex 布局封装**：**方向（含 reverse）、对齐、justify、可选 gap、行内模式**；与 **Button** 同属无状态 API。**文档重点为 `direction` 与 `vertical` 优先级、`wrap` 默认值、与 Row/Space 的选型、以及 reverse 的 a11y 提示**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Flex 结论 |
| --- | --- |
| 职责 | 通用 flex 主轴/交叉轴/换行/gap |
| DOM/语义 | `div` flex / inline-flex |
| 状态与交互 | 无；direction 与 vertical 推导 |
| 数据与受控 | 无 |
| API | `direction`、`vertical`、`align`、`justify`、`wrap`、`gap`、`inline`、`className`、`style` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | reverse 与读屏顺序 |
| 样式与主题 | Tailwind flex 类 + 内联 gap |
| 文档与验证 | 与 Row/Space 对照、wrap 默认 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Flex/Flex.tsx`。

要点：

- `dir = direction ?? (vertical ? 'column' : 'row')`  
- `wrap && 'flex-wrap'`；默认不加 → **nowrap**  
- `style={{ gap: gap !== undefined ? (typeof gap === 'number' ? \`${gap}px\` : gap) : undefined, ...style }}`

（以仓库实际代码为准。）
