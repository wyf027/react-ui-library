# Col 组件技术方案

> 本文档与 **Button 技术方案**采用同一套维度：职责、DOM/语义、状态与交互、数据与受控、API、类型与 Ref、无障碍、样式与主题、文档与验证、风险与演进。  
> **基准组件**：`packages/ui/src/components/basic/Button/Button.tsx`  
> **当前实现**：`packages/ui/src/components/layout/Col/Col.tsx`

---

## 1. 文档信息

| 项 | 内容 |
| --- | --- |
| 组件名 | `Col` |
| 包路径 | `@wuyangfan/nova-ui` → `packages/ui/src/components/layout/Col` |
| 分类 | Layout |
| 依赖 | `cn`；内联 `style` 用于宽度、偏移、flex |
| 关联组件 | **`Row`**（栅格行）、`Container`、`Grid`（与 CSS Grid 选型对照） |

---

## 2. 目标与非目标

### 2.1 目标

1. **12 栅格列占位**：通过 **`span`**（1–12）映射列宽百分比 **`(span/12)*100%`**，与常见 Ant Design 栅格心智一致。  
2. **左侧偏移**：**`offset`** 以同样 12 分制转换为 **`marginLeft` 百分比**，实现空列占位。  
3. **Flex 弹性列**：**`flex`** 设置后走 **flex 布局分支**（`span`/`offset` 的宽度/边距策略不再使用），用于不等分或自适应列。  
4. **排序**：**`order`** 映射 CSS **`order`**，便于响应式重排。  
5. **溢出安全**：根上 **`min-w-0`**（及 flex 分支内 `minWidth: 0`），减少 flex 子项内表格/长文把行撑破的问题。

### 2.2 非目标

1. **响应式 `xs`/`sm`/`md` 多断点 span**：当前实现未内置；由外层重复 `Col`+断点 class 或后续演进 props 承担。  
2. **独立使用无 `Row`**：`Col` 依赖父级 **`display: flex`**（`Row` 提供）才能按百分比宽度正确排布；单独使用需父级自行 flex。  
3. **24 栅格**：当前固定 **12** 分制；若改 24 需大版本与文档全量更新。

---

## 3. 职责与使用场景

| 场景 | 说明 |
| --- | --- |
| 经典两栏 | `Row` 下两 `Col`，如 `span={16}` + `span={8}`。 |
| 侧栏偏移 | `offset={4}` 空出左侧四列再放 `span` 内容。 |
| 弹性侧栏 | `flex="1"` / `flex="0 0 200px"` 等，与注释「与 Ant `flex` 一致」对齐。 |
| 表单多列 | 大屏两列表单，小屏通过外层响应式改为单列（父级布局策略）。 |

---

## 4. DOM / 语义

| 项 | 方案 |
| --- | --- |
| 根元素 | **`div`**；栅格列本身无强语义角色。 |
| 内容区 landmark | 若整列为独立导航/侧栏，应在 **`Col` 内** 使用 `nav`/`aside` 或 `section`+标题，而非给 `Col` 强加 `role`。 |
| 子节点 | 任意业务内容；避免在 `Col` 内再套一层无意义全宽 `div` 抵消宽度策略（除非有意）。 |

---

## 5. 状态与交互

| 项 | 方案 |
| --- | --- |
| 内置状态 | **无**。 |
| 响应式 | 当前无内置断点；交互式重排可用 `order` + 媒体查询父级 class。 |

---

## 6. 数据与受控

| 项 | 方案 |
| --- | --- |
| 业务数据 | **无**。 |
| 样式合并 | `style={{ ...flexStyle, ...style }}`，**用户 `style` 在后**，可覆盖 `width`/`flex`/`order` 等（文档说明覆盖后果）。 |

---

## 7. API 规范

### 7.1 当前实现对照

| 属性 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `span` | 占位列数（12 栅格） | `number` | `12` | 与 `flex` 互斥生效：见 §7.2 |
| `offset` | 左侧偏移列数 | `number` | `0` | 百分比 `marginLeft` |
| `flex` | flex 简写或数字 | `string \| number` | - | 设置后进入 flex 分支 |
| `order` | CSS `order` | `number` | - | 两种分支均会写入 style |
| `className` | 类名扩展 | `string` | - | 默认含 `min-w-0` |
| `style` | 内联样式 | `CSSProperties` | - | 合并于内部宽度/flex 之后 |
| 其余 | `HTMLAttributes<HTMLDivElement>` | - | - | `children` 等 |

### 7.2 `span` / `offset` 与 `flex` 分支（当前实现）

**当 `flex === undefined`（默认栅格模式）：**

- `width: (span/12)*100%`  
- `marginLeft: (offset/12)*100%`  
- 若传入 `order`，写入 `order`。

**当 `flex !== undefined`（flex 模式）：**

- `flex`: 若为 **`number` n**，则设为 **`${n} ${n} auto`**（与常见 flex 数字简写一致）；若为 **`string`**，则原样作为 CSS `flex` 值。  
- **`minWidth: 0`**（与根 `min-w-0` 类协同，防止 flex 子项最小内容宽度撑破）。  
- **`span` / `offset` 不再参与宽度计算**（接口注释：与 Ant Design 一致）。

### 7.3 `span` / `offset` 合法范围与边界

| 项 | 建议 |
| --- | --- |
| `span` | 文档推荐 **1–12**；超出 12 时百分比可大于 100%，行为依赖父 flex 换行，属非推荐用法。 |
| `offset` | 推荐 **0–11**；`span + offset` 超过 12 时可能换行或溢出，需在文档中标注为布局责任。 |

### 7.4 建议演进（可选）

| 属性 | 说明 | 优先级 |
| --- | --- | --- |
| `xs` / `sm` / `md` … | 断点 `span`/`offset` 对象 | P1 |
| `pull` / `push` | 负 margin 等高级栅格 | P3 |
| dev 警告 | `span` 非整数或越界 | P3 |

---

## 8. 类型与 Ref

| 项 | 方案 |
| --- | --- |
| 接口 | `ColProps extends HTMLAttributes<HTMLDivElement>`，扩展 `span`、`offset`、`flex`、`order`。 |
| Ref | `forwardRef<HTMLDivElement, ColProps>`。 |

---

## 9. 无障碍（a11y）

| 项 | 方案 |
| --- | --- |
| 阅读顺序 | 多列布局时 DOM 顺序与视觉阅读顺序一致；仅用 `order` 调整时须注意读屏顺序与视觉顺序可能不一致，谨慎使用。 |
| 焦点路径 | 栅格不改变 tab 顺序；跨列表单建议单逻辑「行」内字段顺序连续。 |
| 侧栏 | `aside`+`nav` 放 `Col` 内，不替代 `Col` 的 `div` 根（或未来 `component` 演进）。 |

---

## 10. 样式与主题

| 项 | 方案 |
| --- | --- |
| 宽度策略 | 栅格模式为 **百分比宽度**；父级 **`Row` 为 flex**，子 `Col` 默认可收缩，`min-w-0` 防止溢出。 |
| 与 `Row.gap` | `Row` 的 `gap` 为列间距；`Col` 宽度为整行 12 分制的占比，二者同时存在时总宽仍受 flex 换行规则约束，文档给典型数值示例。 |
| 与 `Grid` | `Grid` 为 CSS Grid；`Row`+`Col` 为 flex+百分比，文档说明选型。 |

---

## 11. 组合与依赖

| 组合 | 约定 |
| --- | --- |
| **`Row` + `Col`** | 标准栅格；`Row` 提供 `flex` 与 `wrap`。 |
| `Container` + `Row` + `Col` | 页面级常见三层。 |
| `Col` + `Card` | 每列一张卡片；注意列等高与 `align-stretch` 行为。 |

---

## 12. 测试与验收

| 类型 | 用例 |
| --- | --- |
| 默认 | `span=12` → `width: 100%`，`offset=0`。 |
| span+offset | `span=6, offset=3` → 宽度 50%，`marginLeft: 25%`。 |
| flex 数字 | `flex={1}` → `flex: 1 1 auto`（与实现字符串一致）。 |
| flex 字符串 | `flex="0 0 200px"` 原样写入。 |
| flex 时 span 忽略 | `flex` 存在时不使用 `width`/`marginLeft` 自 span/offset。 |
| order | 与 flex 或栅格分支均能带上 `order`。 |
| style 覆盖 | 传入 `width` 可覆盖栅格宽度（文档：高级用法）。 |
| Ref | `HTMLDivElement`。 |

---

## 13. 文档与验证（docs）

| 项 | 内容 |
| --- | --- |
| 示例 | 12 栅格基础、`offset`、两栏、**`flex` 弹性栏**、与 `Row.gap` 组合。 |
| 必含 | **`flex` 设置后 `span`/`offset` 不生效**；12 分制说明。 |
| 反模式 | `span` 总和与 `offset` 导致非预期换行；无 `Row` 单独使用未说明父级 flex。 |

---

## 14. 风险与开放问题

| 风险 | 缓解 |
| --- | --- |
| `span` 非整数 | 百分比仍有效；设计稿若为 5.5 列需业务取舍或 flex。 |
| `order` 造成读屏与视觉顺序不一致 | 文档警示；关键路径避免依赖 `order` 隐藏逻辑顺序。 |
| 无响应式 API | 与产品对齐后做断点 props 或文档推荐 Tailwind 响应式 class 包在 `Col` 上。 |

---

## 15. 结论

`Col` 定位为 **12 栅格列单元**，在 **`Row`（flex）** 下通过 **`span`/`offset`** 或 **`flex`** 两种宽度策略排布；与 **Button** 同属无状态 API，**文档与测试重点为 flex 分支与 span/offset 互斥、以及 `min-w-0` 溢出行为**。

---

## 附录 A：与 Button 九维模板对照表

| 维度 | Col 结论 |
| --- | --- |
| 职责 | 栅格列宽与偏移 / 弹性列 |
| DOM/语义 | `div` |
| 状态与交互 | 无 |
| 数据与受控 | 无 |
| API | `span`、`offset`、`flex`、`order`、`className`、`style` |
| 类型与 Ref | `HTMLDivElement` |
| 无障碍 | 顺序与 `order`；侧栏语义在子树 |
| 样式与主题 | 百分比 + flex 分支 + `min-w-0` |
| 文档与验证 | flex 与 span 互斥、12 分制、与 Row/Grid 对照 |

---

## 附录 B：参考实现片段（当前仓库）

文件：`packages/ui/src/components/layout/Col/Col.tsx`。

要点：

- 默认 `span={12}`、`offset={0}`。  
- 栅格模式：`width` / `marginLeft` 百分比。  
- `flex !== undefined`：`flex` + `minWidth: 0`，不应用 span/offset 宽度公式。  
- `className` 含 `min-w-0`；`style` 合并在后。

（以仓库实际代码为准。）
