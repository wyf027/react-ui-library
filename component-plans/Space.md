# Space 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Space/Space.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Space` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Space` |
| 分类 | Layout |
| 依赖 | `cn`；`Children` / `Fragment` 用于 `split` 注入 |
| 关联组件 | **`Row`**（横向 flex + 任意 px gap，无预设）、**`Grid`**、`Container`、`Button`（按钮组） |

---

## 2. 目标与非目标

### 2.1 目标

1. **一维子项间距**：用 **CSS `gap`** 在子元素之间产生稳定间距，支持 **横向 / 纵向**。  
2. **尺寸预设与数值**：`size` 支持 **`number`**、`**'small' | 'middle' | 'large'`** 或 **`[number, number]`** 二元组（与 Ant Design `Space` 心智对齐）。  
3. **换行**：横向时可通过 **`wrap`** 控制 `flex-wrap`；纵向堆叠默认不换行（见 §7.3）。  
4. **交叉轴对齐**：**`align`** 映射 `items-*`，对标 Ant `Space`。  
5. **分隔符**：**`split`** 在子节点之间插入节点（如 `Divider`、`|`），对标 Ant `split`。

### 2.2 非目标

1. **二维网格**：等分列用 **`Grid`**；比例栅格用 **`Row`/`Col`**。  
2. **子项不等分宽**：`Space` 不分配 flex 比例；由子项自身 `flex`/`width` 控制。  
3. **虚拟列表间距**：长列表用 `VirtualList`/`List` 内部策略。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 表单纵向字段栈 | `direction="vertical"`，`size="middle"`。 |
| 工具栏按钮组 | `direction="horizontal"`，`wrap` 小屏换行。 |
| 标题 + 操作区 | 横向 `Space` + `justify` 若需两端对齐应在外层用 `Row`/`Flex` 或给子项包 `flex-1`（`Space` 无 `justify` prop）。 |
| 带竖线分隔的操作 | `split={<Divider type="vertical" />}` 或文本 `|`。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`div`** + `display: flex`（`flex` 类）+ `flex-row` / `flex-col`。 |
| `split` 注入 | 在相邻子项间插入 **`Fragment` + key** 包裹的 `split` 节点；不改变「子项为 flex item」的结构（`split` 与两侧子项同为 flex 子项）。 |
| 列表语义 | 若子项语义为列表，应在 **`Space` 外** 使用 `ul`/`ol`，或子项使用 `li` 并由外层列表承担（避免 `div` 包 `li` 非法）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**。 |
| `wrap` 与方向 | **仅当 `direction === 'horizontal'`** 时，`wrap` 为 `true` 才加 **`flex-wrap`**；**纵向时恒为 `flex-nowrap`**（`wrap` 不生效），见 §14。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**。 |
| 样式合并 | `style={{ gap: gapCss, ...style }}`，用户 **`style` 在后** 可覆盖 `gap`。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `direction` | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` | |
| `size` | 间距 | `SpaceSize` | `8` | 见 §7.2、§7.3 |
| `wrap` | 横向是否换行 | `boolean` | `true` | 纵向不生效 |
| `align` | 交叉轴对齐 | `'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` | 映射 `items-*` |
| `split` | 子项之间分隔节点 | `ReactNode` | - | 见 §4 |
| `className` | 类名扩展 | `string` | - | |
| `style` | 内联样式 | `CSSProperties` | - | 合并于 `gap` 之后 |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | `children` 等 |

### 7.2 预设 `size` 像素（当前实现）

| 预设 | px |
| --- | --- |
| `small` | 8 |
| `middle` | 16 |
| `large` | 24 |

数字 `size` 直接使用该 px；单值时 `sizeToGapCss` 返回 **`${px}px`**（见下节：单值在实现里只返回一个长度，需核对）。

### 7.3 `sizeToGapCss` 行为详解（与实现一致）

**单值（`number` 或预设转 px）：**

```ts
return `${px}px`
```

即 **`gap: 8px`** 单值形式：行列槽距相同（CSS 单值 `gap` 同时作用于 row-gap 与 column-gap）。

**数组 `size: [first, second]`：**

- **`direction === 'horizontal'`**（`flex-row`）：  
  `return \`${second}px ${first}px\``  
  对应 CSS **`gap: <row-gap> <column-gap>`**：  
  - **`row-gap` = `second`**：换行后**行与行**之间（垂直方向槽距）。  
  - **`column-gap` = `first`**：同一行内**子项之间**（水平方向槽距）。  
  文档约定：**`[水平间距, 垂直间距]`** = `[first, second]`。

- **`direction === 'vertical'`**（`flex-col`）：  
  `return \`${first}px ${second}px\``  
  在纵向主轴堆叠时，**`row-gap` = `first`** 主要体现为**沿主轴（竖直）子项间距**；**`column-gap` = `second`** 在换行产生多「列」时体现为水平间距。  
  文档可记：**`[主轴间距, 交叉轴间距]`** ≈ `[竖直, 水平]`（与横向时的 `[水平, 垂直]` 命名维度对应，避免与数组下标混淆）。

### 7.4 `align` 与类名（当前实现）

| 值 | Tailwind |
| --- | --- |
| `start` | `items-start` |
| `end` | `items-end` |
| `center` | `items-center` |
| `baseline` | `items-baseline` |

无 `stretch`（与 `Row` 默认 `stretch` 不同，Space 默认 `center`）。

### 7.5 `injectSplit` 行为

- `Children.toArray` 过滤 `null`/`undefined`。  
- 子项 ≤1 或 `split == null`：不注入，直接返回原 `children`。  
- 否则在除第一项外的每项前插入 **`Fragment`（key=`space-split-${child.key}` 或 index）** 包裹的 `split`。

### 7.6 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `justify` | `justify-between` 等 | P2 |
| `vertical` 下 `wrap` 语义 | 是否支持纵向多列换行 | P3 |
| `separator` + a11y | 若 split 为装饰性竖线 `aria-orientation` | P2 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `SpaceProps extends HTMLAttributes<HTMLDivElement>`。 |
| 导出类型 | `SpaceSize`、`SpaceSizePreset`。 |
| Ref | `forwardRef<HTMLDivElement, SpaceProps>`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 读屏 | `Space` 为布局容器，无 landmark；分隔符若为纯装饰应 **`aria-hidden`**。 |
| `split` 为 `Divider` | 使用 `Divider` 组件自身的语义/`role`；避免重复朗读。 |
| 焦点顺序 | 子项 tab 顺序不变；`split` 若含可聚焦元素会插入 tab 路径，需设计确认。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 与 `Row` | `Row` 默认 `gap=12` 且 `align-stretch`；`Space` 默认 `size=8`、`align=center`，**预设名 + 纵向栈** 更贴近 Ant `Space`。 |
| 与 `Grid` | `Grid` 二维等分；`Space` 一维链。 |
| 主题 | `gap` 为 px；可演进 token。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| `Space` + `Button` | 横向按钮组；小屏依赖 `wrap`。 |
| `Space` + `FormItem` | 纵向表单项间距。 |
| `Space` + `split` + `Divider` | 使用 `Divider` `orientation` 与横向/纵向一致。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | `flex`、`flex-row`、`items-center`、`flex-wrap`，`gap` 来自 `8px`。 |
| 纵向 | `flex-col`，`gap` 单值 `8px`。 |
| 数组 + 横向 | `[10, 20]` → `gap: 20px 10px`（row 20, col 10）。 |
| split | 三子项插入两个 split 节点；key 稳定。 |
| wrap false | 横向 `flex-nowrap`。 |
| 纵向 + wrap | 仍为 `flex-nowrap`（当前实现）。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 横向/纵向、三种 preset、`split`、与 `Row` 选型表。 |
| 必含 | **横向二元组 `[水平, 垂直]`**；**纵向下 `wrap` 无效**；单值 `gap` 行为。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| 纵向 `wrap` 不生效 | 文档明确；需多列纵向时改用 `Grid` 或自定义 `flex-wrap` + `className`。 |
| 数组语义横向/纵向不一致 | 分别用「水平+垂直」与「主轴+交叉轴」两套话术说明 §7.3。 |
| `split` 导致可聚焦元素增多 | 纯装饰 split 用 `span aria-hidden` 或 Divider 正确语义。 |

---

## 15. 结论

`Space` 定位为 **一维子项间距容器**（Flex + `gap`），以 **`size` 预设/数值/二元组**、**`direction`**、**`split`** 对标 Ant `Space`；与 **Button** 同属无状态 API，**文档与测试重点为 `size` 二元组在不同 `direction` 下的 CSS 映射、以及 `wrap` 仅横向生效**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Space 结论 |
| --- | --- |
| 职责 | 子项一维间距 + 可选分隔符 |
| DOM/语义 | `div` flex row/col |
| 状态与交互 | 无；`wrap` 仅横向 |
| 数据与受控 | 无 |
| API | `direction`、`size`、`wrap`、`align`、`split`、`className`、`style` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | split 装饰与焦点 |
| 样式与主题 | gap px、预设 small/middle/large |
| 文档与验证 | size 数组、wrap 限制、与 Row/Grid 对照 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Space/Space.tsx`。

要点：

- `sizeToGapCss`：单值 → `` `${px}px` ``；横向数组 → `` `${second}px ${first}px` ``；纵向数组 → `` `${first}px ${second}px` ``。  
- `injectSplit`：`Fragment` + key。  
- `className`：`flex`、方向、`alignClass[align]`、横向时 `wrap` 决定 wrap/nowrap。

（以仓库实际代码为准。）
