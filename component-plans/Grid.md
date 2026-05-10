# Grid 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Grid/Grid.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Grid` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Grid` |
| 分类 | Layout |
| 依赖 | `cn`；内联 `style` 用于 `grid-template-columns` 与 `gap` |
| 关联组件 | **`Row`/`Col`**（Flex + 百分比栅格）、**`Space`**、`Container` |

---

## 2. 目标与非目标

### 2.1 目标

1. **CSS Grid 等分列**：通过 **`cols`** 生成 **`repeat(n, minmax(0, 1fr))`**，列宽均分且 **`minmax(0, 1fr)`** 防止子项最小内容宽度撑破轨道（与常见 Grid 最佳实践一致）。  
2. **统一槽间距**：**`gap`** 支持数字或 **`[水平 px, 垂直 px]`**，与 **`Row`** 的 `gap`/`RowGap` 心智一致（见 §7.3）。  
3. **轻量 API**：仅 `cols` + `gap` + 原生 div 属性，适合卡片墙、表单双列等「等分列」场景。

### 2.2 非目标

1. **复杂模板区**：`grid-template-areas`、不规则跨行跨列（`gridColumn: span 2`）由业务 **`style`/`className`** 或后续扩展组件承担，当前不内置 props。  
2. **与 `Row`+`Col` 完全等价**：二者技术栈不同（Grid vs Flex），选型见 §10。  
3. **虚拟化**：大列表用 `VirtualList`/`List`，不在 `Grid` 内做窗口化。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 卡片墙 | 固定 `cols={3}`，子节点为多个 `Card`。 |
| 表单等宽多列 | 表单项按网格单元放置；小屏改单列可用外层响应式改 `cols` 或 class。 |
| 仪表盘模块 | 等分模块占位，与 `minmax(0,1fr)` 防止溢出。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`div`** + Tailwind **`grid`** 类。 |
| 子节点 | 直接子元素为 **grid item**；无需像 `Col` 那样包一层比例组件。 |
| 语义分区 | 若整网格栅为一组相关内容，外层可用 **`section`** + 标题，或父级 `Container`/`main` 承担 landmark。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**。 |
| 响应式列数 | 当前无 `cols` 断点对象；由父级根据视口切换 `cols` 或 `className` 覆盖 `grid-template-columns`（`style` 在后时可覆盖）。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**。 |
| 样式合并 | `style` 对象顺序：`gridTemplateColumns`、`...gapToStyle(gap)`、**`...style`**（用户 `style` 在后，可覆盖列模板与 gap）。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `cols` | 等分列数 | `number` | `3` | 生成 `repeat(cols, minmax(0, 1fr))` |
| `gap` | 网格槽间距 | `GridGap` | `12` | 数字或 `[水平, 垂直]`，见 §7.3 |
| `className` | 类名扩展 | `string` | - | 与 `grid` 合并 |
| `style` | 内联样式 | `CSSProperties` | - | 合并于内置 `gridTemplateColumns`/`gap` 之后 |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | `children` 等 |

### 7.2 类型导出

- `GridProps`  
- `GridGap` = `number | [number, number]`（与 `RowGap` 结构相同，便于文档交叉引用）

### 7.3 `gap` 与 CSS `gap` 映射（与 Row 一致）

实现：

```ts
const [horizontal, vertical] = Array.isArray(gap) ? gap : [gap, gap]
return { gap: `${vertical}px ${horizontal}px` }
```

CSS **`gap: <row-gap> <column-gap>`**（默认文档流为行优先的 grid）：

- **第一项**：行间距（**`vertical`**）— 网格行与行之间。  
- **第二项**：列间距（**`horizontal`**）— 列与列之间。

数组约定：**`[水平 px, 垂直 px]`**，与 **`Row`** 文档保持一致，避免与「row/column」英文词面顺序混淆。

### 7.4 `gridTemplateColumns`（当前实现）

内联为：

```txt
gridTemplateColumns: repeat(${cols}, minmax(0, 1fr))
```

含义： **`cols` 列**，每列 **`minmax(0, 1fr)`** — 最小 0 防止内容撑开轨道，最大 `1fr` 均分剩余空间。

### 7.5 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `cols` 响应式对象 | `{ sm: 1, md: 2, lg: 3 }` | P2 |
| `minColWidth` | `auto-fit` + `minmax(minPx, 1fr)` 流式列 | P2 |
| `rows` | 固定行数或 `auto` 策略 | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `GridProps extends HTMLAttributes<HTMLDivElement>`，扩展 `cols`、`gap`。 |
| Ref | `forwardRef<HTMLDivElement, GridProps>`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 阅读顺序 | Grid **视觉顺序**默认与 **DOM 顺序**一致；勿用 CSS 重排导致读屏与视觉严重错位。 |
| 焦点 | 子项内可聚焦控件顺序由 DOM 与 `tabIndex` 决定；Grid 本身不截获焦点。 |
| 语义 | 网格容器无特殊 role；列表型内容若语义上为列表，应在子级使用 `ul`/`li` 或 `List`。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 与 `Row`+`Col` | **Row/Col**：Flex + 12 分比宽度，适合工具栏、不等宽侧栏。**Grid**：等分列 + 二维槽，适合卡片墙、规则表单栅格。 |
| 与 `Space` | `Space` 为一维子项间距栈；`Grid` 为二维单元格。 |
| 主题 | `gap` 当前为 px；可演进为 token/CSS 变量。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Container` → `Grid` | 限制最大宽度内的卡片墙。 |
| `Grid` 子项为 `Card` | 注意 `Card` 高度不齐时的对齐（可用子项 `className` 或 `items-*` 在父级 flex 包一层—若纯 Grid 可用 `align-items: stretch` 通过 className 扩展）。 |
| 覆盖列模板 | 传入 `style={{ gridTemplateColumns: '...' }}` 覆盖内置 `repeat`，文档标注为高级用法。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | `cols=3`、`gap=12`，存在 `grid` 类，`gridTemplateColumns` 含 `repeat(3, minmax(0, 1fr))`。 |
| gap 单值 | `gap` 为 `12px 12px` 形式（与 Row 一致逻辑）。 |
| gap 数组 | `[16, 8]` → `gap: 8px 16px`（vertical, horizontal）。 |
| style 覆盖 | 用户 `style.gridTemplateColumns` 覆盖内置 repeat。 |
| cols 边界 | `cols=1` 为单列；`cols=0` 或负数为非法，可文档禁止或后续 dev 警告。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 三列卡片、`cols={2}` 表单、与 `Row` 对照选型。 |
| 必含 | **`gap` 数组 `[水平, 垂直]`** 与 CSS `gap` 双值对应关系（同 Row）。 |
| 高级 | 用 `style`/`className` 覆盖 `grid-template-columns` 做不规则布局。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `cols` 非法值 | 文档禁止 0/负数；或运行时 clamp + dev 警告。 |
| 子项数量非 `cols` 整数倍 | 末行可能不满列，属正常 Grid 行为；设计需接受。 |
| 仅会 Flex 的开发者误用 | 文档「何时用 Grid vs Row+Col」决策表。 |

---

## 15. 结论

`Grid` 定位为 **CSS Grid 等分列容器**，以 **`repeat(cols, minmax(0, 1fr))`** 与 **`gap`** 覆盖规则二维布局；与 **Button** 同属无状态 API，**文档重点为与 Row/Col 的选型、`gap` 语义及 `style` 覆盖顺序**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Grid 结论 |
| --- | --- |
| 职责 | 等分列 CSS Grid + 槽间距 |
| DOM/语义 | `div.grid` |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API | `cols`、`gap`、`className`、`style` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | DOM 顺序；子级列表语义 |
| 样式与主题 | `grid-template-columns` + 内联 gap |
| 文档与验证 | gap 语义、与 Row/Col 对照、`cols` 边界 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Grid/Grid.tsx`。

要点：

- `gapToStyle` 与 **`Row`** 相同二元组语义。  
- `style` 合并顺序：`gridTemplateColumns`、`gap`、`...style`（用户可覆盖）。  
- `className={cn('grid', className)}`。

（以仓库实际代码为准。）
